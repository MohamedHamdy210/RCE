import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript"; // Language mode
import "codemirror/mode/css/css"; // Language mode
import "codemirror/mode/htmlmixed/htmlmixed"; // Language mode
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint";
import { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { IconButton } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
export default function Editor({code,setCode,name, mode }) {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div className={`editor ${collapsed ? "collapsed" : ""}`}>
      <header className="editorheader">
        <h2>{name}</h2>
        <IconButton
          type="button"
          onClick={() => {
            setCollapsed((prev) => !prev);
          }}
        >
          {collapsed ? (
            <OpenInFullIcon sx={{ color: "white" }} />
          ) : (
            <CloseFullscreenIcon sx={{ color: "white" }} />
          )}
        </IconButton>
      </header>

      <CodeMirror
        value={code}
        options={{
          mode: mode,
          theme: "material",
          lineNumbers: true, // Show line numbers
          tabSize: 2,
          smartIndent: true,
          matchBrackets: true,
          extraKeys: { "Ctrl-Space": "autocomplete" },
          hintOptions: { completeSingle: false },
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
          console.log(code);
        }}
      />
    </div>
  );
}
