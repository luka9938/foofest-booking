import { createContext, useReducer } from "react";

export const StoreContext = createContext();
export const DispatchContext = createContext();
const initialState = {
  campBasket: [],
  ticketBasket: [],
  tentBasket: [],
  products: [],
};

function reducer(state, action) {
  switch (action.action) {
    case "REMOVE_TICKET":
      const nextTicketBasket = state.ticketBasket.map((item) => {
        if (item.id === action.payload.id) {
          const copy = { ...item };
          copy.amount--;
          return copy;
        } else {
          return item;
        }
      });
      const finalTicketBasket = nextTicketBasket.filter(
        (item) => item.amount > 0
      );

      return {
        ...state,
        ticketBasket: finalTicketBasket,
      };

    case "ADD_TICKET":
      const ticketExists = state.ticketBasket.find(
        (item) => item.id === action.payload.id
      );
      if (ticketExists) {
        const nextTicketBasket = state.ticketBasket.map((item) => {
          if (item.id === action.payload.id) {
            const copy = { ...item };
            copy.amount++;
            return copy;
          } else {
            return item;
          }
        });
        return { ...state, ticketBasket: nextTicketBasket };
      }

      const newTicketItem = action.payload;
      newTicketItem.amount = 1;
      return {
        ...state,
        ticketBasket: state.ticketBasket.concat(newTicketItem),
      };

    case "REMOVE_TENT":
      const nextTentBasket = state.tentBasket.map((item) => {
        if (item.id === action.payload.id) {
          const copy = { ...item };
          copy.amount--;
          return copy;
        } else {
          return item;
        }
      });
      const finalTentBasket = nextTentBasket.filter((item) => item.amount > 0);

      return {
        ...state,
        tentBasket: finalTentBasket,
      };

    case "ADD_TENT":
      const tentExists = state.tentBasket.find(
        (item) => item.id === action.payload.id
      );
      if (tentExists) {
        const nextTentBasket = state.tentBasket.map((item) => {
          if (item.id === action.payload.id) {
            const copy = { ...item };
            copy.amount++;
            return copy;
          } else {
            return item;
          }
        });
        return { ...state, tentBasket: nextTentBasket };
      }

      const newTentItem = action.payload;
      newTentItem.amount = 1;
      return {
        ...state,
        tentBasket: state.tentBasket.concat(newTentItem),
      };

    case "ADD_CAMP":
      return {
        ...state,
        campBasket: [action.payload],
      };

    default:
      return state;
  }
}

export const StoreProvider = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={data}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StoreContext.Provider>
  );
};
