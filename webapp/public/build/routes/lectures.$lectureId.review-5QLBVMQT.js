import {
  useSnackbar
} from "/build/_shared/chunk-6XHJKKVQ.js";
import {
  CheckCircle_default,
  Error_default,
  HourglassTop_default
} from "/build/_shared/chunk-KNOM5Z65.js";
import {
  getLectureDetails,
  validateSummary
} from "/build/_shared/chunk-4ZIDAENA.js";
import "/build/_shared/chunk-MQSBA43Q.js";
import {
  Alert_default,
  Box_default,
  Button_default,
  Chip_default,
  CircularProgress_default,
  Container_default,
  Divider_default,
  Paper_default,
  TextField_default,
  Typography_default,
  useAuth
} from "/build/_shared/chunk-3Q4RW6CJ.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  Navigate,
  init_dist2 as init_dist,
  useParams
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

// app/pages/LectureReviewPage.tsx
var import_react = __toESM(require_react(), 1);
init_dist();
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/pages/LectureReviewPage.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/pages/LectureReviewPage.tsx"
  );
  import.meta.hot.lastModified = "1744588332794.4387";
}
var LectureReviewPage = () => {
  _s();
  const {
    lectureId
  } = useParams();
  const [lecture, setLecture] = (0, import_react.useState)(null);
  const [loading, setLoading] = (0, import_react.useState)(true);
  const [error, setError] = (0, import_react.useState)(null);
  const [validatedSummary, setValidatedSummary] = (0, import_react.useState)("");
  const [isSaving, setIsSaving] = (0, import_react.useState)(false);
  const {
    enqueueSnackbar
  } = useSnackbar();
  const fetchLecture = (0, import_react.useCallback)(async () => {
    if (!lectureId) {
      setError("Lecture ID is missing.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getLectureDetails(lectureId);
      setLecture(data);
      setValidatedSummary(data.is_validated ? data.validated_summary || "" : data.summary || "");
    } catch (err) {
      console.error("Failed to fetch lecture details:", err);
      setError("Failed to load lecture details. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [lectureId]);
  (0, import_react.useEffect)(() => {
    fetchLecture();
  }, [fetchLecture]);
  const handleSummaryChange = (event) => {
    setValidatedSummary(event.target.value);
  };
  const handleSaveAndValidate = async () => {
    if (!lectureId || lecture?.summaryStatus === "IN_PROGRESS" || lecture?.summaryStatus === "NOT_STARTED") {
      enqueueSnackbar("Cannot validate yet, processing not complete.", {
        variant: "warning"
      });
      return;
    }
    setIsSaving(true);
    try {
      const updatedLecture = await validateSummary(lectureId, validatedSummary);
      setLecture(updatedLecture);
      setValidatedSummary(updatedLecture.validated_summary || "");
      enqueueSnackbar("Summary validated successfully!", {
        variant: "success"
      });
    } catch (err) {
      console.error("Failed to validate summary:", err);
      enqueueSnackbar(`Validation failed: ${err.response?.data?.error || err.message || "Unknown error"}`, {
        variant: "error"
      });
    } finally {
      setIsSaving(false);
    }
  };
  const getStatusChip = () => {
    if (!lecture)
      return null;
    if (lecture.is_validated) {
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip_default, { icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CheckCircle_default, {}, void 0, false, {
        fileName: "app/pages/LectureReviewPage.tsx",
        lineNumber: 107,
        columnNumber: 26
      }, this), label: "Validated", color: "success" }, void 0, false, {
        fileName: "app/pages/LectureReviewPage.tsx",
        lineNumber: 107,
        columnNumber: 14
      }, this);
    }
    switch (lecture.summaryStatus) {
      case "COMPLETED":
        return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip_default, { icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CheckCircle_default, {}, void 0, false, {
          fileName: "app/pages/LectureReviewPage.tsx",
          lineNumber: 111,
          columnNumber: 28
        }, this), label: "Ready for Review", color: "primary" }, void 0, false, {
          fileName: "app/pages/LectureReviewPage.tsx",
          lineNumber: 111,
          columnNumber: 16
        }, this);
      case "IN_PROGRESS":
        return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip_default, { icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HourglassTop_default, {}, void 0, false, {
          fileName: "app/pages/LectureReviewPage.tsx",
          lineNumber: 113,
          columnNumber: 28
        }, this), label: "Processing Audio...", color: "warning" }, void 0, false, {
          fileName: "app/pages/LectureReviewPage.tsx",
          lineNumber: 113,
          columnNumber: 16
        }, this);
      case "VALIDATED":
        return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip_default, { icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CheckCircle_default, {}, void 0, false, {
          fileName: "app/pages/LectureReviewPage.tsx",
          lineNumber: 116,
          columnNumber: 28
        }, this), label: "Validated", color: "success" }, void 0, false, {
          fileName: "app/pages/LectureReviewPage.tsx",
          lineNumber: 116,
          columnNumber: 16
        }, this);
      case "ERROR":
        return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip_default, { icon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Error_default, {}, void 0, false, {
          fileName: "app/pages/LectureReviewPage.tsx",
          lineNumber: 118,
          columnNumber: 28
        }, this), label: "Processing Error", color: "error" }, void 0, false, {
          fileName: "app/pages/LectureReviewPage.tsx",
          lineNumber: 118,
          columnNumber: 16
        }, this);
      case "NOT_STARTED":
      default:
        return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Chip_default, { label: "Pending Upload/Processing", color: "default" }, void 0, false, {
          fileName: "app/pages/LectureReviewPage.tsx",
          lineNumber: 121,
          columnNumber: 16
        }, this);
    }
  };
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box_default, { sx: {
      display: "flex",
      justifyContent: "center",
      mt: 5
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircularProgress_default, {}, void 0, false, {
      fileName: "app/pages/LectureReviewPage.tsx",
      lineNumber: 129,
      columnNumber: 8
    }, this) }, void 0, false, {
      fileName: "app/pages/LectureReviewPage.tsx",
      lineNumber: 125,
      columnNumber: 12
    }, this);
  }
  if (error) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Alert_default, { severity: "error", children: error }, void 0, false, {
      fileName: "app/pages/LectureReviewPage.tsx",
      lineNumber: 132,
      columnNumber: 12
    }, this);
  }
  if (!lecture) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Alert_default, { severity: "warning", children: "Lecture data not found." }, void 0, false, {
      fileName: "app/pages/LectureReviewPage.tsx",
      lineNumber: 135,
      columnNumber: 12
    }, this);
  }
  const canValidate = lecture.summaryStatus === "COMPLETED" || lecture.summaryStatus === "VALIDATED";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Container_default, { maxWidth: "md", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box_default, { sx: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 2
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "h4", gutterBottom: true, children: [
        "Review Lecture: ",
        lecture.lectureTitle
      ] }, void 0, true, {
        fileName: "app/pages/LectureReviewPage.tsx",
        lineNumber: 145,
        columnNumber: 9
      }, this),
      getStatusChip()
    ] }, void 0, true, {
      fileName: "app/pages/LectureReviewPage.tsx",
      lineNumber: 139,
      columnNumber: 7
    }, this),
    lecture.summaryStatus === "IN_PROGRESS" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Alert_default, { severity: "info", sx: {
      mb: 3
    }, children: "Audio is currently processing. Transcript and summary will appear here once complete. You can refresh the page or check back later." }, void 0, false, {
      fileName: "app/pages/LectureReviewPage.tsx",
      lineNumber: 151,
      columnNumber: 51
    }, this),
    lecture.summaryStatus === "ERROR" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Alert_default, { severity: "error", sx: {
      mb: 3
    }, children: "An error occurred during processing. You may need to re-upload the audio file." }, void 0, false, {
      fileName: "app/pages/LectureReviewPage.tsx",
      lineNumber: 156,
      columnNumber: 45
    }, this),
    canValidate && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Paper_default, { elevation: 1, sx: {
        p: 3,
        mb: 3
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "h6", gutterBottom: true, children: "Transcript" }, void 0, false, {
          fileName: "app/pages/LectureReviewPage.tsx",
          lineNumber: 169,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Box_default,
          {
            component: "pre",
            sx: {
              whiteSpace: "pre-wrap",
              // Wrap long lines
              wordBreak: "break-word",
              // Break long words
              maxHeight: "300px",
              overflowY: "auto",
              bgcolor: "grey.100",
              p: 2,
              borderRadius: 1,
              fontFamily: "monospace"
            },
            children: lecture.transcript || "Transcript not available."
          },
          void 0,
          false,
          {
            fileName: "app/pages/LectureReviewPage.tsx",
            lineNumber: 170,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "app/pages/LectureReviewPage.tsx",
        lineNumber: 165,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Divider_default, { sx: {
        my: 3
      } }, void 0, false, {
        fileName: "app/pages/LectureReviewPage.tsx",
        lineNumber: 187,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Paper_default, { elevation: 1, sx: {
        p: 3,
        mb: 3
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "h6", gutterBottom: true, children: "AI-Generated Summary (Read-only)" }, void 0, false, {
          fileName: "app/pages/LectureReviewPage.tsx",
          lineNumber: 195,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "body1", sx: {
          color: "text.secondary",
          mb: 2,
          p: 1,
          border: "1px solid #eee",
          borderRadius: 1,
          background: "#f9f9f9"
        }, children: lecture.summary || "AI summary not available." }, void 0, false, {
          fileName: "app/pages/LectureReviewPage.tsx",
          lineNumber: 196,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "h6", gutterBottom: true, children: "Instructor Validated Summary" }, void 0, false, {
          fileName: "app/pages/LectureReviewPage.tsx",
          lineNumber: 207,
          columnNumber: 14
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          TextField_default,
          {
            label: "Edit and Validate Summary",
            multiline: true,
            rows: 8,
            fullWidth: true,
            variant: "outlined",
            value: validatedSummary,
            onChange: handleSummaryChange,
            sx: {
              mb: 2
            },
            disabled: isSaving,
            placeholder: "Review the AI summary above, make corrections here, and then validate."
          },
          void 0,
          false,
          {
            fileName: "app/pages/LectureReviewPage.tsx",
            lineNumber: 208,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Button_default,
          {
            variant: "contained",
            color: "primary",
            onClick: handleSaveAndValidate,
            disabled: isSaving || lecture.is_validated,
            startIcon: isSaving ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircularProgress_default, { size: 20, color: "inherit" }, void 0, false, {
              fileName: "app/pages/LectureReviewPage.tsx",
              lineNumber: 213,
              columnNumber: 31
            }, this) : lecture.is_validated ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CheckCircle_default, {}, void 0, false, {
              fileName: "app/pages/LectureReviewPage.tsx",
              lineNumber: 213,
              columnNumber: 103
            }, this) : void 0,
            children: isSaving ? "Validating..." : lecture.is_validated ? "Summary Validated" : "Save & Validate Summary"
          },
          void 0,
          false,
          {
            fileName: "app/pages/LectureReviewPage.tsx",
            lineNumber: 212,
            columnNumber: 15
          },
          this
        ),
        lecture.is_validated && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "caption", sx: {
          ml: 2,
          color: "success.main"
        }, children: [
          "Validated on ",
          new Date(lecture.lastUpdated * 1e3).toLocaleString()
        ] }, void 0, true, {
          fileName: "app/pages/LectureReviewPage.tsx",
          lineNumber: 216,
          columnNumber: 41
        }, this)
      ] }, void 0, true, {
        fileName: "app/pages/LectureReviewPage.tsx",
        lineNumber: 191,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/pages/LectureReviewPage.tsx",
      lineNumber: 164,
      columnNumber: 23
    }, this)
  ] }, void 0, true, {
    fileName: "app/pages/LectureReviewPage.tsx",
    lineNumber: 138,
    columnNumber: 10
  }, this);
};
_s(LectureReviewPage, "N8QIu2z4lvfqdo9Fo7NldAjgNiI=", false, function() {
  return [useParams, useSnackbar];
});
_c = LectureReviewPage;
var LectureReviewPage_default = LectureReviewPage;
var _c;
$RefreshReg$(_c, "LectureReviewPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/lectures.$lectureId.review.tsx
init_dist();
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/lectures.$lectureId.review.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/lectures.$lectureId.review.tsx"
  );
  import.meta.hot.lastModified = "1744599720910.4878";
}
function LectureReviewRoute() {
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
      fileName: "app/routes/lectures.$lectureId.review.tsx",
      lineNumber: 41,
      columnNumber: 16
    }, this) }, void 0, false, {
      fileName: "app/routes/lectures.$lectureId.review.tsx",
      lineNumber: 35,
      columnNumber: 12
    }, this);
  }
  if (!currentUser) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Navigate, { to: "/login", replace: true }, void 0, false, {
      fileName: "app/routes/lectures.$lectureId.review.tsx",
      lineNumber: 45,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(LectureReviewPage_default, {}, void 0, false, {
    fileName: "app/routes/lectures.$lectureId.review.tsx",
    lineNumber: 47,
    columnNumber: 10
  }, this);
}
_s2(LectureReviewRoute, "+loUN5XsQVjYs/gtfuWkb9VBZ7Q=", false, function() {
  return [useAuth];
});
_c2 = LectureReviewRoute;
var _c2;
$RefreshReg$(_c2, "LectureReviewRoute");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  LectureReviewRoute as default
};
//# sourceMappingURL=/build/routes/lectures.$lectureId.review-5QLBVMQT.js.map
