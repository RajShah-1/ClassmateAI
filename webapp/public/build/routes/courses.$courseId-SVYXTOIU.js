import {
  CheckCircle_default,
  Error_default,
  HourglassTop_default
} from "/build/_shared/chunk-KNOM5Z65.js";
import {
  createLectureRecord,
  getCourseLectures,
  uploadLectureAudio
} from "/build/_shared/chunk-4ZIDAENA.js";
import "/build/_shared/chunk-MQSBA43Q.js";
import {
  Alert_default,
  Avatar_default,
  Box_default,
  Button_default,
  Chip_default,
  CircularProgress_default,
  Container_default,
  DialogActions_default,
  DialogContentText_default,
  DialogContent_default,
  DialogTitle_default,
  Dialog_default,
  Divider_default,
  LinearProgress_default,
  Link_default,
  ListItemAvatar_default,
  ListItemText_default,
  ListItem_default,
  List_default,
  TextField_default,
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

// app/pages/CourseDetailsPage.tsx
var import_react2 = __toESM(require_react(), 1);
init_dist();

// app/components/LectureUpload.tsx
var import_react = __toESM(require_react(), 1);

// node_modules/@mui/icons-material/esm/UploadFile.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
"use client";
var UploadFile_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
  d: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z"
}), "UploadFile");

// app/components/LectureUpload.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/LectureUpload.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/LectureUpload.tsx"
  );
  import.meta.hot.lastModified = "1744588484083.4285";
}
var LectureUpload = ({
  courseId,
  onUploadComplete
}) => {
  _s();
  const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
  const [lectureTitle, setLectureTitle] = (0, import_react.useState)("");
  const [selectedFile, setSelectedFile] = (0, import_react.useState)(null);
  const [uploading, setUploading] = (0, import_react.useState)(false);
  const [uploadProgress, setUploadProgress] = (0, import_react.useState)(0);
  const [error, setError] = (0, import_react.useState)(null);
  const [success, setSuccess] = (0, import_react.useState)(null);
  const fileInputRef = (0, import_react.useRef)(null);
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!file.type.startsWith("audio/")) {
        setError("Please select an audio file.");
        setSelectedFile(null);
        return;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError("File size exceeds 100MB limit.");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setError(null);
      setDialogOpen(true);
    }
  };
  const handleOpenDialog = () => {
    fileInputRef.current?.click();
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setLectureTitle("");
    setSelectedFile(null);
  };
  const handleUpload = async () => {
    if (!selectedFile || !lectureTitle.trim()) {
      setError("Please select a file and enter a title.");
      return;
    }
    setUploading(true);
    setError(null);
    setSuccess(null);
    setUploadProgress(0);
    try {
      const newLecture = await createLectureRecord(courseId, lectureTitle);
      console.log("Lecture record created:", newLecture.lectureID);
      setUploadProgress(50);
      await uploadLectureAudio(courseId, newLecture.lectureID, selectedFile);
      setUploadProgress(100);
      setSuccess(`Lecture "${lectureTitle}" uploaded successfully. Processing will start.`);
      onUploadComplete();
      handleCloseDialog();
    } catch (err) {
      console.error("Upload failed:", err);
      setError(`Upload failed: ${err.response?.data?.error || err.message || "Unknown error"}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Box_default, { sx: {
    mt: 3,
    mb: 2,
    p: 2,
    border: "1px dashed grey",
    borderRadius: 1,
    textAlign: "center"
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "input",
      {
        type: "file",
        accept: "audio/*",
        ref: fileInputRef,
        onChange: handleFileChange,
        style: {
          display: "none"
        },
        id: "audio-upload-input"
      },
      void 0,
      false,
      {
        fileName: "app/components/LectureUpload.tsx",
        lineNumber: 115,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      Button_default,
      {
        variant: "outlined",
        component: "label",
        startIcon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UploadFile_default, {}, void 0, false, {
          fileName: "app/components/LectureUpload.tsx",
          lineNumber: 120,
          columnNumber: 16
        }, this),
        onClick: handleOpenDialog,
        disabled: uploading,
        htmlFor: "audio-upload-input",
        children: "Upload New Lecture Audio"
      },
      void 0,
      false,
      {
        fileName: "app/components/LectureUpload.tsx",
        lineNumber: 119,
        columnNumber: 7
      },
      this
    ),
    uploading && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LinearProgress_default, { variant: "determinate", value: uploadProgress, sx: {
      mt: 2
    } }, void 0, false, {
      fileName: "app/components/LectureUpload.tsx",
      lineNumber: 126,
      columnNumber: 21
    }, this),
    error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Alert_default, { severity: "error", sx: {
      mt: 2
    }, children: error }, void 0, false, {
      fileName: "app/components/LectureUpload.tsx",
      lineNumber: 129,
      columnNumber: 17
    }, this),
    success && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Alert_default, { severity: "success", sx: {
      mt: 2
    }, children: success }, void 0, false, {
      fileName: "app/components/LectureUpload.tsx",
      lineNumber: 132,
      columnNumber: 19
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog_default, { open: dialogOpen, onClose: handleCloseDialog, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle_default, { children: "Enter Lecture Title" }, void 0, false, {
        fileName: "app/components/LectureUpload.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent_default, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContentText_default, { sx: {
          mb: 2
        }, children: [
          'Please provide a title for the lecture audio: "',
          selectedFile?.name,
          '".'
        ] }, void 0, true, {
          fileName: "app/components/LectureUpload.tsx",
          lineNumber: 139,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextField_default, { autoFocus: true, margin: "dense", id: "lectureTitle", label: "Lecture Title", type: "text", fullWidth: true, variant: "standard", value: lectureTitle, onChange: (e) => setLectureTitle(e.target.value), required: true }, void 0, false, {
          fileName: "app/components/LectureUpload.tsx",
          lineNumber: 144,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/LectureUpload.tsx",
        lineNumber: 138,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogActions_default, { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button_default, { onClick: handleCloseDialog, disabled: uploading, children: "Cancel" }, void 0, false, {
          fileName: "app/components/LectureUpload.tsx",
          lineNumber: 147,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button_default, { onClick: handleUpload, disabled: uploading || !lectureTitle.trim(), children: uploading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircularProgress_default, { size: 24 }, void 0, false, {
          fileName: "app/components/LectureUpload.tsx",
          lineNumber: 149,
          columnNumber: 26
        }, this) : "Upload" }, void 0, false, {
          fileName: "app/components/LectureUpload.tsx",
          lineNumber: 148,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/LectureUpload.tsx",
        lineNumber: 146,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/LectureUpload.tsx",
      lineNumber: 136,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/LectureUpload.tsx",
    lineNumber: 107,
    columnNumber: 10
  }, this);
};
_s(LectureUpload, "wqfI5QpUKGbUtTa0S/Loi1nxOTY=");
_c = LectureUpload;
var LectureUpload_default = LectureUpload;
var _c;
$RefreshReg$(_c, "LectureUpload");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// node_modules/@mui/icons-material/esm/Audiotrack.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
"use client";
var Audiotrack_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", {
  d: "M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3z"
}), "Audiotrack");

// node_modules/@mui/icons-material/esm/Pending.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
"use client";
var Pending_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", {
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2M7 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5m5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5m5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5"
}), "Pending");

// app/pages/CourseDetailsPage.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/pages/CourseDetailsPage.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/pages/CourseDetailsPage.tsx"
  );
  import.meta.hot.lastModified = "1744588300834.2722";
}
var CourseDetailsPage = () => {
  _s2();
  const {
    courseId
  } = useParams();
  const [lectures, setLectures] = (0, import_react2.useState)([]);
  const [course, setCourse] = (0, import_react2.useState)(null);
  const [loading, setLoading] = (0, import_react2.useState)(true);
  const [error, setError] = (0, import_react2.useState)(null);
  const fetchLectures = (0, import_react2.useCallback)(async () => {
    if (!courseId) {
      setError("Course ID is missing.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const lecturesData = await getCourseLectures(courseId);
      setLectures(lecturesData);
    } catch (err) {
      console.error("Failed to fetch lectures:", err);
      setError("Failed to load lectures. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [courseId]);
  (0, import_react2.useEffect)(() => {
    fetchLectures();
  }, [fetchLectures]);
  const getStatusChip = (status, isValidated) => {
    if (isValidated) {
      return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Chip_default, { icon: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(CheckCircle_default, {}, void 0, false, {
        fileName: "app/pages/CourseDetailsPage.tsx",
        lineNumber: 70,
        columnNumber: 26
      }, this), label: "Validated", color: "success", size: "small", variant: "outlined" }, void 0, false, {
        fileName: "app/pages/CourseDetailsPage.tsx",
        lineNumber: 70,
        columnNumber: 14
      }, this);
    }
    switch (status) {
      case "COMPLETED":
        return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Chip_default, { icon: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(CheckCircle_default, {}, void 0, false, {
          fileName: "app/pages/CourseDetailsPage.tsx",
          lineNumber: 74,
          columnNumber: 28
        }, this), label: "Ready for Review", color: "primary", size: "small", variant: "outlined" }, void 0, false, {
          fileName: "app/pages/CourseDetailsPage.tsx",
          lineNumber: 74,
          columnNumber: 16
        }, this);
      case "IN_PROGRESS":
        return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Chip_default, { icon: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(HourglassTop_default, {}, void 0, false, {
          fileName: "app/pages/CourseDetailsPage.tsx",
          lineNumber: 76,
          columnNumber: 28
        }, this), label: "Processing", color: "warning", size: "small", variant: "outlined" }, void 0, false, {
          fileName: "app/pages/CourseDetailsPage.tsx",
          lineNumber: 76,
          columnNumber: 16
        }, this);
      case "VALIDATED":
        return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Chip_default, { icon: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(CheckCircle_default, {}, void 0, false, {
          fileName: "app/pages/CourseDetailsPage.tsx",
          lineNumber: 79,
          columnNumber: 28
        }, this), label: "Validated", color: "success", size: "small", variant: "outlined" }, void 0, false, {
          fileName: "app/pages/CourseDetailsPage.tsx",
          lineNumber: 79,
          columnNumber: 16
        }, this);
      case "ERROR":
        return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Chip_default, { icon: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Error_default, {}, void 0, false, {
          fileName: "app/pages/CourseDetailsPage.tsx",
          lineNumber: 81,
          columnNumber: 28
        }, this), label: "Error", color: "error", size: "small", variant: "outlined" }, void 0, false, {
          fileName: "app/pages/CourseDetailsPage.tsx",
          lineNumber: 81,
          columnNumber: 16
        }, this);
      case "NOT_STARTED":
      default:
        return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Chip_default, { icon: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Pending_default, {}, void 0, false, {
          fileName: "app/pages/CourseDetailsPage.tsx",
          lineNumber: 84,
          columnNumber: 28
        }, this), label: "Pending Upload", color: "default", size: "small", variant: "outlined" }, void 0, false, {
          fileName: "app/pages/CourseDetailsPage.tsx",
          lineNumber: 84,
          columnNumber: 16
        }, this);
    }
  };
  if (loading && lectures.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Box_default, { sx: {
      display: "flex",
      justifyContent: "center",
      mt: 5
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(CircularProgress_default, {}, void 0, false, {
      fileName: "app/pages/CourseDetailsPage.tsx",
      lineNumber: 94,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/pages/CourseDetailsPage.tsx",
      lineNumber: 89,
      columnNumber: 12
    }, this);
  }
  if (error) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Alert_default, { severity: "error", children: error }, void 0, false, {
      fileName: "app/pages/CourseDetailsPage.tsx",
      lineNumber: 98,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Container_default, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Typography_default, { variant: "h4", gutterBottom: true, sx: {
      mb: 3
    }, children: "Lectures " }, void 0, false, {
      fileName: "app/pages/CourseDetailsPage.tsx",
      lineNumber: 102,
      columnNumber: 7
    }, this),
    courseId && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(LectureUpload_default, { courseId, onUploadComplete: fetchLectures }, void 0, false, {
      fileName: "app/pages/CourseDetailsPage.tsx",
      lineNumber: 109,
      columnNumber: 20
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Divider_default, { sx: {
      my: 3
    } }, void 0, false, {
      fileName: "app/pages/CourseDetailsPage.tsx",
      lineNumber: 111,
      columnNumber: 8
    }, this),
    loading && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(CircularProgress_default, { size: 20, sx: {
      display: "block",
      margin: "auto"
    } }, void 0, false, {
      fileName: "app/pages/CourseDetailsPage.tsx",
      lineNumber: 116,
      columnNumber: 19
    }, this),
    !loading && lectures.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Typography_default, { sx: {
      mt: 2
    }, children: "No lectures uploaded for this course yet." }, void 0, false, {
      fileName: "app/pages/CourseDetailsPage.tsx",
      lineNumber: 120,
      columnNumber: 44
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(List_default, { sx: {
      width: "100%",
      bgcolor: "background.paper"
    }, children: lectures.map((lecture) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ListItem_default, { secondaryAction: getStatusChip(lecture.summaryStatus, lecture.is_validated), sx: {
      borderBottom: "1px solid #eee"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ListItemAvatar_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Avatar_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Audiotrack_default, {}, void 0, false, {
        fileName: "app/pages/CourseDetailsPage.tsx",
        lineNumber: 131,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "app/pages/CourseDetailsPage.tsx",
        lineNumber: 130,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/pages/CourseDetailsPage.tsx",
        lineNumber: 129,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ListItemText_default, { primary: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Link_default, { component: Link, to: `/lectures/${lecture.lectureID}/review`, underline: "hover", children: lecture.lectureTitle }, void 0, false, {
        fileName: "app/pages/CourseDetailsPage.tsx",
        lineNumber: 134,
        columnNumber: 38
      }, this), secondary: `Uploaded: ${lecture.uploadDate ? new Date(lecture.uploadDate * 1e3).toLocaleDateString() : "N/A"} | Duration: ${lecture.duration ? Math.round(lecture.duration / 60) + " min" : "N/A"}` }, void 0, false, {
        fileName: "app/pages/CourseDetailsPage.tsx",
        lineNumber: 134,
        columnNumber: 15
      }, this)
    ] }, lecture.lectureID, true, {
      fileName: "app/pages/CourseDetailsPage.tsx",
      lineNumber: 126,
      columnNumber: 36
    }, this)) }, void 0, false, {
      fileName: "app/pages/CourseDetailsPage.tsx",
      lineNumber: 122,
      columnNumber: 65
    }, this)
  ] }, void 0, true, {
    fileName: "app/pages/CourseDetailsPage.tsx",
    lineNumber: 100,
    columnNumber: 10
  }, this);
};
_s2(CourseDetailsPage, "j9doEAuxz4L2AI3yMF7uWnfgZGI=", false, function() {
  return [useParams];
});
_c2 = CourseDetailsPage;
var CourseDetailsPage_default = CourseDetailsPage;
var _c2;
$RefreshReg$(_c2, "CourseDetailsPage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/courses.$courseId.tsx
init_dist();
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/courses.$courseId.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s3 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/courses.$courseId.tsx"
  );
  import.meta.hot.lastModified = "1744599681845.3167";
}
function CourseDetailsRoute() {
  _s3();
  const {
    currentUser,
    loading
  } = useAuth();
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Box_default, { sx: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50vh"
    }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(CircularProgress_default, {}, void 0, false, {
      fileName: "app/routes/courses.$courseId.tsx",
      lineNumber: 41,
      columnNumber: 16
    }, this) }, void 0, false, {
      fileName: "app/routes/courses.$courseId.tsx",
      lineNumber: 35,
      columnNumber: 12
    }, this);
  }
  if (!currentUser) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Navigate, { to: "/login", replace: true }, void 0, false, {
      fileName: "app/routes/courses.$courseId.tsx",
      lineNumber: 45,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(CourseDetailsPage_default, {}, void 0, false, {
    fileName: "app/routes/courses.$courseId.tsx",
    lineNumber: 47,
    columnNumber: 10
  }, this);
}
_s3(CourseDetailsRoute, "+loUN5XsQVjYs/gtfuWkb9VBZ7Q=", false, function() {
  return [useAuth];
});
_c3 = CourseDetailsRoute;
var _c3;
$RefreshReg$(_c3, "CourseDetailsRoute");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  CourseDetailsRoute as default
};
//# sourceMappingURL=/build/routes/courses.$courseId-SVYXTOIU.js.map
