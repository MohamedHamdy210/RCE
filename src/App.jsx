import { useEffect, useState } from "react";
import Editor from "./components/Editor";
import { Button } from "@mui/material";
function App() {
  const [html, setHtml] = useState(
    `${
      JSON.parse(localStorage.getItem("html")) ||
      "<!-- write your code here --!>"
    }`
  );
  const [css, setCss] = useState(
    `${JSON.parse(localStorage.getItem("css")) || "/*write your code here*/"}`
  );
  const [js, setJs] = useState(
    `${JSON.parse(localStorage.getItem("js")) || "//write your code here"}`
  );

  const [srcDoc, setSrcDoc] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(
        `
        <!doctype html>
        <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>${css}</style>
            </head>
            <body>
            ${html}
              <script>${js}</script>
              </body>
        </html>

         `
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, css, js]);
  const reset = () => {
    localStorage.removeItem("css");
    localStorage.removeItem("html");
    localStorage.removeItem("js");
    setCss("");
    setHtml("");
    setJs("");
  };
  return (
    <>
      <header className="header">
        <h2>OCE</h2>
        <Button
          variant="contained"
          onClick={() => {
            reset();
          }}
        >
          Reset
        </Button>
      </header>

      <div className="pane top-pane">
        <Editor
          code={html}
          setCode={(code) => {
            localStorage.setItem("html", JSON.stringify(code));
            setHtml(code);
          }}
          name="HTML"
          mode="htmlmixed"
        />
        <Editor
          code={css}
          setCode={(code) => {
            localStorage.setItem("css", JSON.stringify(code));
            setCss(code);
          }}
          name="CSS"
          mode="css"
        />
        <Editor
          code={js}
          setCode={(code) => {
            localStorage.setItem("js", JSON.stringify(code));
            setJs(code);
          }}
          name="JS"
          mode="javascript"
        />
      </div>

      <iframe srcDoc={srcDoc} />
    </>
  );
}

export default App;
