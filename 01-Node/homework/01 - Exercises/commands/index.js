const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");

function pwd(print) {
  print(process.cwd());
}

function date(print) {
  print(Date());
}

function echo(print, args) {
  print(args);
}

function ls(print) {
  fs.readdir(".", (error, files) => {
    if (error) {
      throw Error(error);
    }
    print(files.toString().split(",").join(" "));
  });
}

function cat(print, args) {
  fs.readFile(args[0], "utf-8", (error, data) => {
    if (error) throw Error(error);
    print(data);
  });
}

function head(print, args) {
  fs.readFile(args[0], "utf-8", (error, data) => {
    if (error) {
      throw Error(error);
    }
    //almacena en la variable "data". se usa el método "split" para separar la cadena en un arreglo donde cada elemento es una línea del archivo."splice" para extraer solo el primer elemento del arreglo."join" para unir los elementos del arreglo en una cadena y se llama a la función "print" con esta cadena como argumento, lo que resulta en la impresión del primer renglón del archivo en la terminal.
    print(data.split("\n").splice(0, 1).join(""));
  });
}

function tail(print, args) {
  fs.readFile(args[0], "utf-8", (error, data) => {
    if (error) throw Error(error);
    //almacena en la variable "data". Luego, se usa el método "split" para separar la cadena en un arreglo donde cada elemento es una línea del archivo. Se utiliza el método "at(-1)" para extraer el último elemento del arreglo. Finalmente, se usa el método "trim" para eliminar cualquier espacio adicional al principio y al final de la cadena y se llama a la función "print" con esta cadena como argumento, lo que resulta en la impresión del último renglón del archivo en la terminal.
    print(data.split("\n").at(-1).trim());
  });
}

function curl(print, args) {
  utils.request(args, (error, response) => {
    if (error) throw Error(error);
    print(response.data);
  });
}

module.exports = {
  pwd,
  date,
  echo,
  ls,
  cat,
  head,
  tail,
  curl,
};
