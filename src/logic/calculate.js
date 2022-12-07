import Big from "big.js";

const isNumber = (item) => {
  return /[0-9]+/.test(item)
}

const operate = (numberOne, numberTwo, operation) => {
  const one = Big(numberOne || "0")
  const two = Big(numberTwo || (operation === "÷" || operation === "x" ? "1" : "0"));

  if (operation === "+") {
    return one.plus(two).toString();
  }
  if (operation === "-") {
    return one.minus(two).toString();
  }
  if (operation === "x") {
    return one.times(two).toString();
  }
  if (operation === "÷") {
    if (two === "0") {
      alert("Divide by 0 error");
      return "0";
    } else {
      return one.div(two).toString();
    }
  }
  throw Error(`Unknown operation '${operation}'`);
}

export default function calculate(obj, buttonName) {
  if(buttonName === "AC") {
    return {
      total: null,
      next: null,
      operation: null,
      history: null,
    };
  }

  if(isNumber(buttonName)){
    if(buttonName === "0" && obj.next === "0") {
      return {};
    }
    // if there is an operation, update next
    if (obj.operation) {
      if(obj.next) {
        return { 
          next: obj.next + buttonName
        };
      }
      return { next: buttonName };
    }
    // if there is no operation, update next and clear the value
    if (obj.next) {
      const next = obj.next === "0" ? buttonName : obj.next + buttonName;
      return {
        next,
        total: null,
      }
    };
    return {
      next: buttonName,
      total: null,
      history: null
    };
  }

  if (buttonName === "%") {
    if (obj.operation && obj.next) {
      const result = operate(obj.total, obj.next, obj.operation);
      return {
        total: Big(result)
          .div(Big("100"))
          .toString(),
        next: null,
        operation: null,
        history: result + buttonName
      };
    }
    if(obj.next) {
      return {
        next: Big(obj.next)
          .div(Big("100"))
          .toString(),
        history: obj.next + buttonName,
      };
    }
    return {};
  }
  if (buttonName === ".") {
    if (obj.next) {
      if (obj.next.includes(".")) {
        return {}
      }
      return { next: obj.next + "." };
    }
    return { next: "0." };
  }

  if (buttonName === "=") {
    if (obj.next && obj.operation) {
      return {
        total: operate(obj.total, obj.next, obj.operation),
        next: null,
        operation: null,
        history: obj.total || "0" + obj.operation + obj.next
      };
    } else {
      return {};
    }
  }

  if (buttonName === "+/-") {
    if (obj.next) {
      return { next: (-1 * parseFloat(obj.next)).toString()};
    }
    if (obj.total) {
      return {total: (-1 * parseFloat(obj.total)).toString()};
    }
    return {};
  } 

  if(obj.operation) {
    const one = Big(obj.total || "0")
    const two = Big(obj.next || (obj.operation === "÷" || obj.operation === "x" ? "1" : "0"));
    return {
      total: operate(obj.total, obj.next, obj.operation),
      next: null,
      operation: buttonName,
      history: one + obj.operation + two,
    };
  }

  if(!obj.next) {
    return {operation: buttonName};
  }

  return {
    total: obj.next,
    next: null,
    operation: buttonName,
    history: obj.next,
  };
}