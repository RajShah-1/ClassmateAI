import "/build/_shared/chunk-MQSBA43Q.js";
import {
  Button_default,
  CircularProgress_default,
  Container_default,
  GoogleAuthProvider,
  Paper_default,
  Typography_default,
  authInstance,
  createSvgIcon,
  signInWithPopup,
  useAuth
} from "/build/_shared/chunk-3Q4RW6CJ.js";
import {
  require_jsx_runtime
} from "/build/_shared/chunk-B43JI2TA.js";
import {
  init_dist2 as init_dist,
  useNavigate
} from "/build/_shared/chunk-KUMZYU2S.js";
import {
  createHotContext
} from "/build/_shared/chunk-7T5YNNBA.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/pages/LoginPage.tsx
var import_react = __toESM(require_react(), 1);
init_dist();

// node_modules/@mui/icons-material/esm/Google.js
var React = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
"use client";
var Google_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
  d: "M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
}), "Google");

// app/pages/LoginPage.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/pages/LoginPage.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/pages/LoginPage.tsx"
  );
  import.meta.hot.lastModified = "1744588192691.599";
}
var LoginPage = () => {
  _s();
  const {
    currentUser
  } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = (0, import_react.useState)(false);
  const [error, setError] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(authInstance, provider);
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      setError("Failed to sign in with Google. Please try again.");
      setLoading(false);
    }
  };
  if (currentUser) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Container_default, { component: "main", maxWidth: "xs", sx: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircularProgress_default, {}, void 0, false, {
      fileName: "app/pages/LoginPage.tsx",
      lineNumber: 68,
      columnNumber: 15
    }, this) }, void 0, false, {
      fileName: "app/pages/LoginPage.tsx",
      lineNumber: 62,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Container_default, { component: "main", maxWidth: "xs", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Paper_default, { elevation: 3, sx: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 4
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { component: "h1", variant: "h5", sx: {
      mb: 3
    }, children: "Instructor Sign In" }, void 0, false, {
      fileName: "app/pages/LoginPage.tsx",
      lineNumber: 79,
      columnNumber: 9
    }, this),
    error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { color: "error", sx: {
      mb: 2
    }, children: error }, void 0, false, {
      fileName: "app/pages/LoginPage.tsx",
      lineNumber: 84,
      columnNumber: 19
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button_default, { type: "button", fullWidth: true, variant: "contained", sx: {
      mt: 1,
      mb: 2
    }, startIcon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Google_default, {}, void 0, false, {
      fileName: "app/pages/LoginPage.tsx",
      lineNumber: 92,
      columnNumber: 21
    }, this), onClick: handleGoogleSignIn, disabled: loading, children: loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircularProgress_default, { size: 24, color: "inherit" }, void 0, false, {
      fileName: "app/pages/LoginPage.tsx",
      lineNumber: 93,
      columnNumber: 22
    }, this) : "Sign In with Google" }, void 0, false, {
      fileName: "app/pages/LoginPage.tsx",
      lineNumber: 89,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/pages/LoginPage.tsx",
    lineNumber: 72,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/pages/LoginPage.tsx",
    lineNumber: 71,
    columnNumber: 10
  }, this);
};
_s(LoginPage, "dVK36GXwn6zi3N+b2cKJwUpPuUY=", false, function() {
  return [useAuth, useNavigate];
});
_c = LoginPage;
var LoginPage_default = LoginPage;
var _c;
$RefreshReg$(_c, "LoginPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/login.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/login.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/login.tsx"
  );
  import.meta.hot.lastModified = "1744599595163.4321";
}
function LoginRoute() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(LoginPage_default, {}, void 0, false, {
    fileName: "app/routes/login.tsx",
    lineNumber: 24,
    columnNumber: 10
  }, this);
}
_c2 = LoginRoute;
var _c2;
$RefreshReg$(_c2, "LoginRoute");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  LoginRoute as default
};
//# sourceMappingURL=/build/routes/login-OJ7BI3NL.js.map
