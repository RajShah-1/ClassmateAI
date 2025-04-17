import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration
} from "/build/_shared/chunk-VHSPCX6R.js";
import {
  SnackbarProvider
} from "/build/_shared/chunk-6XHJKKVQ.js";
import {
  AppBar_default,
  AuthProvider,
  Box_default,
  Button_default,
  Container_default,
  CssBaseline_default,
  ThemeProvider,
  Toolbar_default,
  Typography_default,
  createTheme,
  useAuth
} from "/build/_shared/chunk-3Q4RW6CJ.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  Outlet
} from "/build/_shared/chunk-KUMZYU2S.js";
import {
  createHotContext
} from "/build/_shared/chunk-7T5YNNBA.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/root.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/root.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/root.tsx"
  );
  import.meta.hot.lastModified = "1744600139698.8638";
}
var meta = () => [{
  charset: "utf-8"
}, {
  title: "ClassmateAI Instructor"
}, {
  name: "viewport",
  content: "width=device-width,initial-scale=1"
}];
var theme = createTheme({
  palette: {
    primary: {
      main: "#6F4EA0"
      // Purple similar to mobile app
    },
    secondary: {
      main: "#F2DFF8"
      // Lighter purple
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "box-shadow 0.3s ease-in-out",
          // Smooth hover effect
          "&:hover": {
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)"
            // Example hover shadow
          }
        }
      }
    }
  }
});
function AppLayout() {
  _s();
  const {
    currentUser,
    logout
  } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box_default, { sx: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  }, children: [
    currentUser && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppBar_default, { position: "static", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toolbar_default, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "h6", component: "div", sx: {
        flexGrow: 1
      }, children: "ClassmateAI Instructor Panel" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 96,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button_default, { color: "inherit", onClick: handleLogout, children: [
        "Logout (",
        currentUser.email?.split("@")[0],
        ")"
      ] }, void 0, true, {
        fileName: "app/root.tsx",
        lineNumber: 101,
        columnNumber: 18
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 95,
      columnNumber: 14
    }, this) }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 94,
      columnNumber: 23
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Container_default, { component: "main", sx: {
      mt: currentUser ? 4 : 0,
      mb: 4,
      flexGrow: 1
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 112,
        columnNumber: 9
      }, this),
      " "
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 107,
      columnNumber: 7
    }, this),
    currentUser && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box_default, { component: "footer", sx: {
      p: 2,
      mt: "auto",
      backgroundColor: (theme2) => theme2.palette.grey[200]
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "body2", color: "text.secondary", align: "center", children: [
      "\xA9 ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " ClassmateAI"
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 120,
      columnNumber: 15
    }, this) }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 115,
      columnNumber: 24
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 88,
    columnNumber: 10
  }, this);
}
_s(AppLayout, "irPLFJ3DqMTL8RNRVsehGT4mySY=", false, function() {
  return [useAuth];
});
_c = AppLayout;
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 138,
        columnNumber: 9
      }, this),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 140,
        columnNumber: 10
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 141,
        columnNumber: 10
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 142,
        columnNumber: 10
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 143,
        columnNumber: 10
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 136,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeProvider, { theme, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CssBaseline_default, {}, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 147,
          columnNumber: 11
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SnackbarProvider, { maxSnack: 3, anchorOrigin: {
          vertical: "bottom",
          horizontal: "right"
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AuthProvider, { children: [
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppLayout, {}, void 0, false, {
            fileName: "app/root.tsx",
            lineNumber: 153,
            columnNumber: 15
          }, this),
          " "
        ] }, void 0, true, {
          fileName: "app/root.tsx",
          lineNumber: 152,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 148,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/root.tsx",
        lineNumber: 146,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollRestoration, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 158,
        columnNumber: 9
      }, this),
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 159,
        columnNumber: 9
      }, this),
      " ",
      " "
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 145,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 135,
    columnNumber: 10
  }, this);
}
_c2 = App;
function ErrorBoundary() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("title", { children: "Oh no!" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 173,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 174,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 175,
        columnNumber: 18
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 172,
      columnNumber: 14
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { children: "Something went wrong!" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 178,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "An error occurred. Please try refreshing the page." }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 179,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 181,
        columnNumber: 18
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 177,
      columnNumber: 14
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 171,
    columnNumber: 10
  }, this);
}
_c3 = ErrorBoundary;
var _c;
var _c2;
var _c3;
$RefreshReg$(_c, "AppLayout");
$RefreshReg$(_c2, "App");
$RefreshReg$(_c3, "ErrorBoundary");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ErrorBoundary,
  App as default,
  meta
};
//# sourceMappingURL=/build/root-MKMA5HQM.js.map
