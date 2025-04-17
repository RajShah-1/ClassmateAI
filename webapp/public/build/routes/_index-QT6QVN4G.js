import {
  getCourses
} from "/build/_shared/chunk-4ZIDAENA.js";
import "/build/_shared/chunk-MQSBA43Q.js";
import {
  Alert_default,
  Box_default,
  CardContent_default,
  Card_default,
  CircularProgress_default,
  Container_default,
  Grid_default,
  Link_default,
  Typography_default,
  createSvgIcon,
  useAuth
} from "/build/_shared/chunk-3Q4RW6CJ.js";
import {
  require_jsx_runtime
} from "/build/_shared/chunk-B43JI2TA.js";
import {
  Link,
  Navigate,
  init_dist2 as init_dist
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

// app/pages/CoursesDashboard.tsx
var import_react = __toESM(require_react(), 1);
init_dist();

// node_modules/@mui/icons-material/esm/School.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
"use client";
var School_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
  d: "M5 13.18v4L12 21l7-3.82v-4L12 17zM12 3 1 9l11 6 9-4.91V17h2V9z"
}), "School");

// app/pages/CoursesDashboard.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/pages/CoursesDashboard.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/pages/CoursesDashboard.tsx"
  );
  import.meta.hot.lastModified = "1744588515519.3445";
}
var CoursesDashboard = () => {
  _s();
  const [courses, setCourses] = (0, import_react.useState)([]);
  const [loading, setLoading] = (0, import_react.useState)(true);
  const [error, setError] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Failed to load courses. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box_default, { sx: {
      display: "flex",
      justifyContent: "center",
      mt: 5
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircularProgress_default, {}, void 0, false, {
      fileName: "app/pages/CoursesDashboard.tsx",
      lineNumber: 56,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/pages/CoursesDashboard.tsx",
      lineNumber: 51,
      columnNumber: 12
    }, this);
  }
  if (error) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Alert_default, { severity: "error", children: error }, void 0, false, {
      fileName: "app/pages/CoursesDashboard.tsx",
      lineNumber: 60,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Container_default, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "h4", gutterBottom: true, sx: {
      mb: 3
    }, children: "Your Courses" }, void 0, false, {
      fileName: "app/pages/CoursesDashboard.tsx",
      lineNumber: 63,
      columnNumber: 7
    }, this),
    courses.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { children: "No courses found. You can create courses through the backend or add a UI element here." }, void 0, false, {
      fileName: "app/pages/CoursesDashboard.tsx",
      lineNumber: 68,
      columnNumber: 31
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid_default, { container: true, spacing: 3, children: courses.map((course) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Grid_default, { item: true, xs: 12, sm: 6, md: 4, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link_default, { component: Link, to: `/courses/${course.courseID}`, underline: "none", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card_default, { sx: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      "&:hover": {
        boxShadow: 6
      }
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent_default, { sx: {
      flexGrow: 1
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(School_default, { color: "action", sx: {
        fontSize: 40,
        mb: 1
      } }, void 0, false, {
        fileName: "app/pages/CoursesDashboard.tsx",
        lineNumber: 82,
        columnNumber: 23
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { gutterBottom: true, variant: "h6", component: "div", children: course.courseName }, void 0, false, {
        fileName: "app/pages/CoursesDashboard.tsx",
        lineNumber: 86,
        columnNumber: 23
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "body2", color: "text.secondary", sx: {
        mb: 1
      }, children: course.courseSummary }, void 0, false, {
        fileName: "app/pages/CoursesDashboard.tsx",
        lineNumber: 89,
        columnNumber: 23
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "caption", display: "block", color: "text.secondary", children: [
        course.lectures?.length ?? 0,
        " Lecture(s)"
      ] }, void 0, true, {
        fileName: "app/pages/CoursesDashboard.tsx",
        lineNumber: 94,
        columnNumber: 23
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "caption", display: "block", color: "text.secondary", children: [
        "Last Updated: ",
        new Date(course.lastUpdated * 1e3).toLocaleDateString()
      ] }, void 0, true, {
        fileName: "app/pages/CoursesDashboard.tsx",
        lineNumber: 97,
        columnNumber: 24
      }, this)
    ] }, void 0, true, {
      fileName: "app/pages/CoursesDashboard.tsx",
      lineNumber: 79,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "app/pages/CoursesDashboard.tsx",
      lineNumber: 71,
      columnNumber: 18
    }, this) }, void 0, false, {
      fileName: "app/pages/CoursesDashboard.tsx",
      lineNumber: 70,
      columnNumber: 16
    }, this) }, course.courseID, false, {
      fileName: "app/pages/CoursesDashboard.tsx",
      lineNumber: 69,
      columnNumber: 34
    }, this)) }, void 0, false, {
      fileName: "app/pages/CoursesDashboard.tsx",
      lineNumber: 68,
      columnNumber: 145
    }, this)
  ] }, void 0, true, {
    fileName: "app/pages/CoursesDashboard.tsx",
    lineNumber: 62,
    columnNumber: 10
  }, this);
};
_s(CoursesDashboard, "3cKph4ptvGvSDZ2TPdv+ijJzbyg=");
_c = CoursesDashboard;
var CoursesDashboard_default = CoursesDashboard;
var _c;
$RefreshReg$(_c, "CoursesDashboard");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/_index.tsx
init_dist();
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/_index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/_index.tsx"
  );
  import.meta.hot.lastModified = "1744599632532.7363";
}
function IndexRoute() {
  _s2();
  const {
    currentUser,
    loading
  } = useAuth();
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Box_default, { sx: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50vh"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(CircularProgress_default, {}, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 42,
      columnNumber: 12
    }, this) }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 36,
      columnNumber: 12
    }, this);
  }
  if (!currentUser) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Navigate, { to: "/login", replace: true }, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 47,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(CoursesDashboard_default, {}, void 0, false, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 51,
    columnNumber: 10
  }, this);
}
_s2(IndexRoute, "+loUN5XsQVjYs/gtfuWkb9VBZ7Q=", false, function() {
  return [useAuth];
});
_c2 = IndexRoute;
var _c2;
$RefreshReg$(_c2, "IndexRoute");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  IndexRoute as default
};
//# sourceMappingURL=/build/routes/_index-QT6QVN4G.js.map
