import "@stdlib/deploy";

// это сообщение приведет к тому, что наш контракт добавит сумму к счетчику
message Add {
    amount: Int as uint32;
}

// это сообщение приведет к тому, что в нашем контракте будет вычтена сумма из счетчика
message Subtract {
    amount: Int as uint32;
}

// это сообщение заставит наш контракт выполнить сложную математическую операцию на счетчике
message MultiMath {
    ops: Operations;
}

// 
struct Operations {
    add: Int as uint32;
    subtract: Int as uint32;
    multiply: Int as uint32;
}

contract Messages with Deployable {
    val: Int as int64;
 
    init() {
        self.val = 0;
    }

    //обработчик для получения TON без каких-либо сообщений
    receive(){

    }

    // обработчик для сообщения "Добавить" - это двоичное сообщение, у которого есть входной аргумент (сумма).
    receive(msg: Add) {
        self.val = self.val + msg.amount;
    }

    // обработчик сообщения "Вычесть" - это другое двоичное сообщение, хотя его формат идентичен
    receive(msg: Subtract) {
        self.val = self.val - msg.amount;
    }

    // обработчик сообщения "MultiMath" - это двоичное сообщение, содержащее несколько входных аргументов
    receive(msg: MultiMath) {
        self.val = self.val + msg.ops.add;
        self.val = self.val - msg.ops.subtract;
        self.val = self.val * msg.ops.multiply;
    }

    // обработчик текстового сообщения "increment" - это текстовое строковое сообщение, которое не может содержать входных аргументов
    receive("increment") {
        self.val = self.val + 1;
    }

    // обработчик текстового сообщения "decrement" - это другое текстовое строковое сообщение, их может быть столько, сколько вы захотите
    receive("decrement") {
        self.val = self.val - 1;
    }

    // если ни один из предыдущих получателей не соответствует строке комментария, вызывается этот 
    receive(msg: String) {
        // ..
    }

    // 
    receive(msg: Slice) {
        // ...
    }
 
    get fun value(): Int {
        return self.val;
    }
