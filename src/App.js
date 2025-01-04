import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./styles/style.css";

function App() {
  useEffect(function quote() {
    async function callquote() {
      try {
        const res = await fetch("https://dummyjson.com/quotes");
        const data = await res.json();
        setquote(data.quotes);
        console.log(data.quotes);
      } catch (error) {
        console.log("eroor fecthing data:", error);
      }
    }
    callquote();
  }, []);

  const [count, setcount] = useState(0);
  const [author, setauthor] = useState("Mary Kay Ash");
  const [quote, setquote] = useState("");
  const [text, settest] = useState(
    "Never give up beecause you never know if the next try is going to be the one that works"
  );

  const handlespeak = () => {
    let value = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(value);
  };

  const handelquote = () => {
    let array = quote.map((item) => item);
    let Qoute = array[count];

    if (count === 29) {
      toast.error("u have reached the end of the quote");
      setcount(0);
    } else {
      setcount((c) => c + 1);
    }
    settest(Qoute.quote);
    setauthor(Qoute.author);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  };
  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="Header">
          <h1>Quote of the Day</h1>
        </div>
        <div className="quote">
          <p>{text}</p>
          <div className="small">
            {" "}
            <small>---{author}</small>
          </div>
        </div>
        <div className="footer">
          <div className="icons">
            <i onClick={handlespeak} class="fa-solid fa-volume-high"></i>
            <i onClick={handleCopy} class="fa-regular fa-copy"></i>
            <i class="fa-brands fa-github"></i>
          </div>
          <button onClick={handelquote}>New Quote</button>
        </div>
      </div>
    </>
  );
}

export default App;
