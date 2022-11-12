import todoState from "./todoState";
import todoItem from "./todoItem";

//Needed becuase Crypto is not included in the TS library yet
declare global {
  interface Crypto {
    randomUUID: () => string;
  }
}

export { todoState, todoItem };
