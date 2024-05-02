import "@stdlib/deploy";


message Add {
    amount: Int as uint32;
}

contract FirstContract with Deployable {
    
    id: Int as uint32;
    counter: Int as uint32; // Cчетчик

    init(id: Int) {
        self.id = id;
        self.counter = 0;
    }

////////// ГЕТЕРЫ  //////////
    get fun counter(): Int {
        return self.counter;
    }

    get fun id(): Int{
        return self.id;
    }
////////// ГЕТЕРЫ  //////////


    // если пришла транзакчия с текстом plus увеличиваем счетчик
    receive("plus"){
        self.counter += 1;
    }

    // если пришла транзакция с сообщением, увеличиваем счеткич на значение из сообщения
    receive(msg: Add){
        self.counter += msg.amount;
    }
}
