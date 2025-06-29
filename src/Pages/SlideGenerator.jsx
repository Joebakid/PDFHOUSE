import React, { useState } from "react";
import PptxGenJS from "pptxgenjs";

const defaultSlide = {
  title: "",
  content: "",
  textColor: "#000000",
  textSize: 18,
  bgType: "color", // "color", "gradient", "image", "svg"
  bgValue: "#ffffff", // color code, gradient CSS, image URL, or SVG URL
};

const SlideGenerator = () => {
  const [presentationTitle, setPresentationTitle] = useState("");
  const [titleStyle, setTitleStyle] = useState({
    fontSize: 28,
    color: "#222222",
    bold: true,
  });

  const [slides, setSlides] = useState([{ ...defaultSlide }]);

  const updateSlide = (index, field, value) => {
    const updated = [...slides];
    updated[index][field] = value;
    setSlides(updated);
  };

  const addSlide = () => setSlides([...slides, { ...defaultSlide }]);

  const removeSlide = (index) => {
    const updated = [...slides];
    updated.splice(index, 1);
    setSlides(updated);
  };

  const generatePPT = () => {
    const pptx = new PptxGenJS();

    // Title Slide
    const titleSlide = pptx.addSlide();
    titleSlide.addText(presentationTitle, {
      x: 1,
      y: 1.5,
      fontSize: titleStyle.fontSize,
      bold: titleStyle.bold,
      color: titleStyle.color,
    });

    // Other Slides
    slides.forEach((slide) => {
      const s = pptx.addSlide();

      // Background
      if (slide.bgType === "color") {
        s.background = { fill: slide.bgValue };
      } else if (slide.bgType === "gradient") {
        s.background = { fill: slide.bgValue };
      } else if (slide.bgType === "image" || slide.bgType === "svg") {
        s.background = { path: slide.bgValue };
      }

      // Text - Always on top
      s.addText(slide.title, {
        x: 0.5,
        y: 0.5,
        fontSize: slide.textSize + 4,
        bold: true,
        color: slide.textColor,
      });

      s.addText(slide.content, {
        x: 0.5,
        y: 1.2,
        fontSize: slide.textSize,
        color: slide.textColor,
        w: "90%",
        h: "60%",
        valign: "top",
      });
    });

    pptx.writeFile("Presentation.pptx");
  };

  return (
    <div className="min-h-screen px-4 py-8 transition-all duration-300 bg-white dark:bg-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="mb-4 text-2xl font-bold text-center">🎞️ Slide Generator</h2>

        {/* Title Slide Input */}
        <input
          type="text"
          placeholder="Presentation Title"
          value={presentationTitle}
          onChange={(e) => setPresentationTitle(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded dark:bg-gray-800 dark:border-gray-600"
        />

        {/* Title Styling */}
        <div className="flex flex-wrap gap-4 mb-6">
          <label>
            Title Size:
            <input
              type="number"
              value={titleStyle.fontSize}
              onChange={(e) =>
                setTitleStyle({ ...titleStyle, fontSize: Number(e.target.value) })
              }
              className="w-20 p-1 ml-2 border rounded dark:bg-gray-800 dark:border-gray-600"
            />
          </label>
          <label>
            Title Color:
            <input
              type="color"
              value={titleStyle.color}
              onChange={(e) =>
                setTitleStyle({ ...titleStyle, color: e.target.value })
              }
              className="ml-2"
            />
          </label>
        </div>

        {slides.map((slide, index) => (
          <div key={index} className="p-4 mb-6 border rounded-lg shadow dark:border-gray-700">
            <h3 className="mb-2 text-lg font-semibold">Slide {index + 1}</h3>
            <input
              type="text"
              placeholder="Slide Title"
              value={slide.title}
              onChange={(e) => updateSlide(index, "title", e.target.value)}
              className="w-full px-3 py-2 mb-2 border rounded dark:bg-gray-800 dark:border-gray-600"
            />
            <textarea
              placeholder="Slide Content"
              value={slide.content}
              onChange={(e) => updateSlide(index, "content", e.target.value)}
              className="w-full px-3 py-2 mb-2 border rounded dark:bg-gray-800 dark:border-gray-600"
              rows={3}
            />
            <div className="flex flex-wrap gap-3">
              <label>
                Text Size:
                <input
                  type="number"
                  value={slide.textSize}
                  onChange={(e) =>
                    updateSlide(index, "textSize", Number(e.target.value))
                  }
                  className="w-20 p-1 ml-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                />
              </label>
              <label>
                Text Color:
                <input
                  type="color"
                  value={slide.textColor}
                  onChange={(e) =>
                    updateSlide(index, "textColor", e.target.value)
                  }
                  className="ml-2"
                />
              </label>

              <label>
                BG Type:
                <select
                  value={slide.bgType}
                  onChange={(e) => updateSlide(index, "bgType", e.target.value)}
                  className="p-1 ml-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                >
                  <option value="color">Color</option>
                  <option value="gradient">Gradient</option>
                  <option value="image">Image URL</option>
                  <option value="svg">SVG URL</option>
                </select>
              </label>
              <input
                type={
                  slide.bgType === "color" || slide.bgType === "gradient"
                    ? "text"
                    : "url"
                }
                placeholder={
                  slide.bgType === "color"
                    ? "#ffffff"
                    : slide.bgType === "gradient"
                    ? "linear-gradient(#e66465, #9198e5)"
                    : "https://example.com/image.jpg"
                }
                value={slide.bgValue}
                onChange={(e) => updateSlide(index, "bgValue", e.target.value)}
                className="flex-1 p-1 border rounded dark:bg-gray-800 dark:border-gray-600"
              />
            </div>

            <button
              onClick={() => removeSlide(index)}
              className="px-3 py-1 mt-4 text-sm text-white bg-red-600 rounded hover:bg-red-700"
            >
              Remove Slide
            </button>
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <button
            onClick={addSlide}
            className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800"
          >
            ➕ Add Slide
          </button>
          <button
            onClick={generatePPT}
            className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            ⬇️ Download PPTX
          </button>
        </div>

        {/* Live Preview */}
        <div className="mt-10">
          <h3 className="mb-4 text-xl font-bold text-center">📺 Preview</h3>
          <div className="space-y-6">
            <div className="p-4 text-center bg-gray-100 border rounded shadow dark:border-gray-700 dark:bg-gray-800">
              <h4 style={{ fontSize: `${titleStyle.fontSize}px`, color: titleStyle.color }}>
                {presentationTitle || "Presentation Title"}
              </h4>
            </div>
            {slides.map((s, i) => (
              <div
                key={i}
                className="p-4 text-center border rounded shadow dark:border-gray-700"
                style={{
                  background: s.bgType === "color" ? s.bgValue : undefined,
                  backgroundImage: s.bgType === "gradient" ? s.bgValue : undefined,
                  backgroundSize: "cover",
                  backgroundImage:
                    s.bgType === "image" || s.bgType === "svg"
                      ? `url(${s.bgValue})`
                      : s.bgType === "gradient"
                      ? s.bgValue
                      : undefined,
                }}
              >
                <h4 style={{ fontSize: `${s.textSize + 4}px`, color: s.textColor }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: `${s.textSize}px`, color: s.textColor }}>
                  {s.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideGenerator;
