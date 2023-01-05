import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2022-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trouser",
    amount: 89.29,
    date: new Date("2022-02-23"),
  },
  {
    id: "e3",
    description: "Umbrella",
    amount: 109.29,
    date: new Date("2022-02-05"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 10.29,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "A book",
    amount: 18.29,
    date: new Date("2022-02-18"),
  },
  {
    id: "e6",
    description: "A book",
    amount: 10.29,
    date: new Date("2022-06-19"),
  },
  {
    id: "e7",
    description: "A book",
    amount: 18.29,
    date: new Date("2022-02-18"),
  },

  {
    id: "e8",
    description: "A book1",
    amount: 10.24,
    date: new Date("2022-12-30"),
  },
  {
    id: "e9",
    description: "A book2",
    amount: 18.25,
    date: new Date("01-04"),
    date: new Date("2023-01-04"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatebleExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatebleExpenseIndex];
      const updatableItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatebleExpenseIndex] = updatableItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesCtxProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };
  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  };

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesCtxProvider;
