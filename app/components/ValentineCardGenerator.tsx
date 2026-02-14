"use client";

import { useState, useRef } from "react";
import CardPreview from "./CardPreview";
import { Download, FileText, Mail, Heart, ArrowLeft, Send } from "lucide-react";

export default function ValentineCardGenerator() {
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("romantic");
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("center");
  const [isGenerating, setIsGenerating] = useState(false);
  const [font, setFont] = useState("serif");
  const cardRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    setRecipient("");
    setMessage("");
    setTheme("romantic");
    setAlignment("center");
    setFont("serif");
  };


  const createDownloadCard = () => {
    const themeGradients: Record<string,string> = {
      romantic:"linear-gradient(135deg,#ec4899,#f43f5e,#800020)",
      dark:"linear-gradient(135deg,#1f2937,#111827,#000)",
      pastel:"linear-gradient(135deg,#fbcfe8,#e9d5ff,#bfdbfe)"
    };

    const alignMap = { left:"flex-start", center:"center", right:"flex-end" };
    const textAlignMap = { left:"left", center:"center", right:"right" };

    const card = document.createElement("div");
    card.style.cssText = `
      position:fixed;
      left:-9999px;
      width:400px;
      height:500px;
      border-radius:16px;
      overflow:hidden;
      background:${themeGradients[theme]};
    `;

    card.innerHTML = `
      <div style="
        position:absolute;
        inset:0;
        display:flex;
        flex-direction:column;
        align-items:${alignMap[alignment]};
        justify-content:center;
        text-align:${textAlignMap[alignment]};
        color:white;
        padding:40px;
        font-family:'Playfair Display', serif;
      ">
        <div style="font-size:48px;margin-bottom:20px;">❤️</div>

        <h2 style="font-size:36px;font-weight:bold;margin-bottom:20px;">
          Dear <span style="font-style:italic;text-decoration:underline;">
          ${recipient || "Someone Special"}
          </span>,
        </h2>

        <p style="font-size:16px;line-height:1.6;max-width:300px;margin-bottom:30px;font-family:${font};">
          ${message || "Your beautiful message will appear here..."}
        </p>

        <div style="font-style:italic;font-size:20px;">With Love ✨</div>
      </div>
    `;
    return card;
  };


  const handleEmail = async () => {
    try {
      const html2canvas = (await import("html2canvas")).default;
      const downloadCard = createDownloadCard();
      document.body.appendChild(downloadCard);

      const canvas = await html2canvas(downloadCard, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
      });

      document.body.removeChild(downloadCard);

      const subject = encodeURIComponent(`Valentine Card for ${recipient}`);
      const body = encodeURIComponent(
        `Dear ${recipient},\n\n${message}\n\nWith Love ❤️`
      );

      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    } catch (error) {
      console.error("Email failed:", error);
      alert("Failed to prepare email.");
    }
  };

  const handleDownloadImage = async () => {
    try {
      setIsGenerating(true);
      const html2canvas = (await import("html2canvas")).default;

      const downloadCard = createDownloadCard();
      document.body.appendChild(downloadCard);

      const canvas = await html2canvas(downloadCard,{ scale:2, backgroundColor:"#ffffff" });
      document.body.removeChild(downloadCard);

      const imageData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `valentine-card-${recipient || "card"}.png`;
      link.href = imageData;
      link.click();

      alert("Card image downloaded successfully!");
    } catch (err) {
      alert("Download failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGenerating(true);
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const downloadCard = createDownloadCard();
      document.body.appendChild(downloadCard);

      const canvas = await html2canvas(downloadCard,{ scale:2, backgroundColor:"#ffffff" });
      document.body.removeChild(downloadCard);

      const imageData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({ orientation:"portrait", unit:"px", format:[400,500] });
      pdf.addImage(imageData,"PNG",0,0,400,500);
      pdf.save(`valentine-card-${recipient || "card"}.pdf`);

      alert("Card PDF downloaded successfully!");
    } catch {
      alert("PDF failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="flex flex-col items-center px-4 py-8 w-full max-w-6xl mx-auto">

      {/* STEP BAR */}
      <div className="w-full max-w-3xl mb-12 relative flex justify-between text-sm font-semibold text-gray-500">
        <div className="absolute top-1/2 w-full h-0.5 bg-gray-200"/>
        <div className="absolute top-1/2 h-0.5 bg-[#800020]"
          style={{width:step===1?"0%":step===2?"50%":"100%"}}/>
        <Step number={1} label="Personalize" active={step>=1}/>
        <Step number={2} label="Preview" active={step>=2}/>
        <Step number={3} label="Send" active={step>=3}/>
      </div>

      {/* STEP 1 */}
      {step===1 && (
        <div className="grid lg:grid-cols-2 gap-12 w-full">

          <div className="flex flex-col gap-6">

            <input
              value={recipient}
              onChange={e=>setRecipient(e.target.value)}
              placeholder="Recipient Name"
              className="px-4 py-4 border-2 rounded-lg"
            />

            <textarea
              value={message}
              onChange={e=>setMessage(e.target.value)}
              placeholder="Personal Message"
              rows={5}
              className="px-4 py-4 border-2 rounded-lg resize-none"
            />

            <select value={theme} onChange={e=>setTheme(e.target.value)} className="px-4 py-3 border-2 rounded-lg">
              <option value="romantic">Romantic</option>
              <option value="dark">Dark Love</option>
              <option value="pastel">Pastel Dream</option>
            </select>

            {/* Handwriting toggle */}
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={font!=="serif"}
                onChange={e=>setFont(e.target.checked?"'Dancing Script',cursive":"serif")}
              />
              Handwriting Mode ✍️
            </label>

            <select value={font} onChange={e=>setFont(e.target.value)} className="px-4 py-3 border-2 rounded-lg">
              <option value="serif">Classic</option>
              <option value="'Great Vibes',cursive">Elegant</option>
              <option value="'Dancing Script',cursive">Cute</option>
              <option value="'Pacifico',cursive">Fun</option>
            </select>

            <div className="flex gap-3">
              {["left","center","right"].map(a=>(
                <button key={a}
                  onClick={()=>setAlignment(a as any)}
                  className={`flex-1 py-3 rounded-lg border ${alignment===a?"bg-[#800020] text-white":"bg-white"}`}>
                  {a}
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button onClick={handleReset} className="flex-1 bg-gray-200 py-4 rounded-xl">Reset</button>
              <button disabled={!recipient||!message}
                onClick={()=>setStep(2)}
                className="flex-1 bg-[#800020] text-white py-4 rounded-xl">
                Next →
              </button>
            </div>
          </div>

          <CardPreview
            recipient={recipient}
            message={message}
            theme={theme}
            alignment={alignment}
            font={font}
          />
        </div>
      )}

      {/* STEP 2 */}
      {step===2 && (
        <div className="w-full max-w-4xl text-center">

          <div className="flex justify-center mb-8">
            <CardPreview
              recipient={recipient}
              message={message}
              theme={theme}
              alignment={alignment}
              font={font}
            />
          </div>

          <div className="flex gap-4 justify-center">
            <button onClick={()=>setStep(1)} className="px-8 py-4 border rounded-xl">Back</button>
            <button onClick={()=>setStep(3)} className="px-8 py-4 bg-[#800020] text-white rounded-xl">Continue</button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="w-full max-w-4xl text-center">
          <h1 className="font-display text-5xl font-bold text-gray-900 mb-6">
            Share Your Love
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button onClick={handleDownloadImage} className="p-8 border rounded-xl hover:bg-gray-50">
              <Download size={40} className="mx-auto mb-2" />
              <p className="font-semibold">Download PNG</p>
            </button>

            <button onClick={handleDownloadPDF} className="p-8 border rounded-xl hover:bg-gray-50">
              <FileText size={40} className="mx-auto mb-2" />
              <p className="font-semibold">Download PDF</p>
            </button>

            <button onClick={handleEmail} className="p-8 border rounded-xl hover:bg-gray-50">
              <Mail size={40} className="mx-auto mb-2" />
              <p className="font-semibold">Email</p>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function Step({number,label,active}:{number:number,label:string,active:boolean}){
  return(
    <div className="flex flex-col items-center gap-1">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${active?"bg-[#800020] text-white":"bg-gray-200"}`}>
        {number}
      </div>
      <span>{label}</span>
    </div>
  );
}
