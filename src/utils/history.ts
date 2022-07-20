import { createBrowserHistory } from "history"
import { useLayoutEffect, useRef, useState,createElement } from "react";
import { Router } from "react-router-dom";

const customHistory = createBrowserHistory({window})
export { customHistory }

export function MyBrowserRouter(_ref :any) {
    let {
      basename,
      children,
    } = _ref;
    let historyRef :any= useRef();
    
  
    if (historyRef.current == null) {
      historyRef.current = customHistory
    }
  
    let history = historyRef.current;
    let [state, setState] = useState({
      action: history.action,
      location: history.location
    });
    useLayoutEffect(() => history.listen(setState), [history]);
    return /*#__PURE__*/createElement(Router, {
      basename: basename,
      children: children,
      location: state.location,
      navigationType: state.action,
      navigator: history
    });
  }
