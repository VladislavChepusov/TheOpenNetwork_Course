import * as dotenv from 'dotenv';
 

// Определение асинхронной функции main
async function main() {

    dotenv.config();

    // Доступ к сохраненной строке из файла .env
    const myString = process.env.MY_STRING;
    console.log(myString); // Выведет "Это моя строка для файла конфигурации"
}




// Проверка, является ли скрипт главным модулем для выполнения
if (require.main === module) {
    main();
}
