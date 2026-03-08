import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

function ReadArticle() {

  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [selectedText, setSelectedText] = useState("");

  const [startTime] = useState(Date.now());


  const fetchArticle = async () => {

    const res = await API.get(`/articles/${id}`);
    setArticle(res.data);

  };


  



  const trackTime = async () => {

    const duration = Math.floor((Date.now() - startTime) / 1000);

    await API.post("/tracking/reading-time", {
      articleId: id,
      duration
    });

  };
  useEffect(() => {

    fetchArticle();


    return () => {
      trackTime();
    };

  }, []);
  const handleHighlight = () => {

    const text = window.getSelection().toString();

    if (text.length > 0) {
      setSelectedText(text);
    }

  };

  const saveHighlight = async () => {

    await API.post("/student/highlights", {
      articleId: id,
      text: selectedText
    });

    alert("Highlight saved");

    setSelectedText("");

  };

  if (!article) return <div className="p-6">Loading...</div>;

  return (

    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-4">
        {article.title}
      </h1>

      <p className="text-gray-500 mb-6">
        Category: {article.category}
      </p>

      <div
        onMouseUp={handleHighlight}
        className="space-y-4 leading-7 text-lg"
      >

        {article.contentBlocks.map((block, index) => {

          if (block.type === "text") {
            return <p key={index}>{block.value}</p>;
          }

          if (block.type === "image") {
            return (
              <img
                key={index}
                src={block.value}
                className="rounded-xl shadow-lg w-full"
              />
            );
          }

          if (block.type === "video") {
            return (
              <iframe
                key={index}
                src={block.value}
                className="w-full h-64"
              />
            );
          }

        })}

      </div>

      {selectedText && (

        <div className="mt-6 p-4 bg-yellow-100 rounded">

          <p className="mb-2 font-semibold">
            Highlighted Text
          </p>

          <p className="italic">{selectedText}</p>

          <button
            onClick={saveHighlight}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Highlight
          </button>

        </div>

      )}

    </div>

  );
}

export default ReadArticle;