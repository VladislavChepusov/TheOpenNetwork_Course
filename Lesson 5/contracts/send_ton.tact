import "@stdlib/deploy";

message Withdraw{
    amount: Int as coins;
}

contract SendTon with Deployable {
    const MinTonForStorage: Int = ton("0.01"); // 1 KB на 2.5 года оплатить
    owner: Address;
    init() {
        self.owner = sender();
    }

// рпазрешение выполенния запросов ток при условии что отправитель это хозяин смарт конракта
    fun onlyOwner(){
        require(sender() == self.owner, "only owner is allowed to withdraw");
    }

    receive(){
        // принимает входящие переводы в тонах
    }

// вернуть все что есть в контаркте (ТОНЫ) = SendRemainingBalance
    receive("withdraw all"){
        self.onlyOwner();
        send(SendParameters{
            to: sender(),
            bounce: true,
            value: 0,
            mode: SendRemainingBalance + SendIgnoreErrors
        });
    }
// вернуть почти все, но чтобы осталось тонов для оплаты хранения контрактов в бблокчейне
    receive("withdraw safe"){
        self.onlyOwner();
        send(SendParameters{
            to: sender(),
            bounce: true,
            value: myBalance() - context().value - self.MinTonForStorage,
            mode: SendIgnoreErrors + SendRemainingValue
        });
    }

// вернуть столько сколько запросили но чтобы осталось на оплату коммисий в блокчейне
    receive(msg: Withdraw){
        self.onlyOwner();
        let amount: Int = min(msg.amount, myBalance() - context().value - self.MinTonForStorage);
        require(amount>0, "Insufficient balance");
        send(SendParameters{
            to: sender(),
            bounce: true,
            value: amount,
            mode: SendIgnoreErrors + SendRemainingValue
        });
    }

// Баланс смарт контракта 
    get fun balance(): Int{
        return myBalance();
    }
}