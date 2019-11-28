#!/usr/bin/env node
var readline = require("readline")
var chalk = require("chalk")
var figlet = require("figlet")
var log = console.log;

//interface
var reader = readline.createInterface({
    input: process.stdin,   // input from console
    output: process.stdout, // output at console
    prompt: ">"
})

console.log(chalk.blue(figlet.textSync("Tasker")))
console.log(chalk.cyan("Type a command (Type help to see the list of commands)"))
reader.prompt()

var arr = []

reader.on("line", function (data) {

    var cmd = data.split(" ")[0] //cmd
    var sArr = data.split(" ")
    sArr.shift()                 //task

    if (cmd == "help") {
        log(`Available commands
            1. add task_name
            2. delete task_id
            3. ls to list all task`)

        reader.prompt()

    } else if (cmd == "add" && sArr.length > 0) {
        arr.push(sArr.join(" "))
        log(chalk.green("One task added"))
        reader.prompt()

    } else if (cmd == "ls") {
        if (arr.length == 0) {
            log(chalk.green("No task found"))
            return;
        }

        for (var i = 0; i < arr.length; i++)
            console.log(i + 1 + "." + arr[i])   //log(`${i + 1}. ${arr[i]}`)

        reader.prompt()

    } else if (cmd == "delete" && sArr.length > 0) {
        if (Number.parseInt(sArr[0]) > arr.length) {
            log(chalk.green("No task to delete"))
            reader.prompt()
            return;

        }else if(Number.parseInt(sArr[0]) == 0){
            log(chalk.green("No task to delete"))
            reader.prompt()
            return;
        }

        var tempArr = []
        var pos = Number.parseInt(sArr[0])
        for (var i = 0; i < arr.length; i++) {
            if (i != pos - 1) {
                tempArr.push(arr[i])
            }
        }
        arr = tempArr
        log(chalk.green("File successfully deleted"))
        reader.prompt()

    }
    else {
        console.log(chalk.red("Invalid Command"))
        reader.prompt()

    }
})

reader.on("close", function () {
    console.log("Exiting....")
})
