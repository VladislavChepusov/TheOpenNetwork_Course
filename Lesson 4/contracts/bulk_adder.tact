import "@stdlib/deploy";

message Reach {
    counter: Address;
    target: Int as uint32;
}

message CounterValue {
    amount: Int as uint32;
}

contract BulkAdder with Deployable {

    target: Int as uint32;

    init() {
    self.target = 0;    
    }

// Шаг 1 по получения счетчика из другого контракта
    receive(msg: Reach){

        //require(msg.target<=10, "таргет не может быть больше 10" ); // проверка 1 вида

        if(msg.target > 10){
            throw(123);  // второй способ позволяющий обрабатывать сообщения через bounced
        }

        self.target = msg.target;
        send(SendParameters{
            to: msg.counter,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: "query".asComment()
        });
    }

 // Шаг 3 принять сообщение от контракта counter
    receive(msg: CounterValue){
         if(self.target>msg.amount){
            send(SendParameters{
                to: sender(),
                value: 0,
                mode: SendRemainingValue + SendIgnoreErrors,
                body: "increment".asComment()
            });
        }
    }   
}
