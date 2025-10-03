"use client";
import { useEffect, useState } from "react";
import { sendMessage as sendChat } from "../apis/api";
import Navbar from "../components/Navbar"; // adjust path if needed

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const askBot = async (question) => {
    if (!question.trim()) return;

    setMessages((prev) => [...prev, { text: question, sender: "user" }]);
    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await sendChat(question);
        setMessages((prev) => [...prev, { text: res, sender: "bot" }]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          { text: { message: "⚠️ Error fetching reply" }, sender: "bot" },
        ]);
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  useEffect(() => {
    const initialQuestion = localStorage.getItem("initialQuestion");
    if (initialQuestion) {
      localStorage.removeItem("initialQuestion");
      askBot(initialQuestion);
    }
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      askBot(input);
      setInput("");
    }
  };

  // helper to render skills in many possible shapes
  const renderSkills = (skills) => {
    if (!skills) return null;

    // 1) array of strings
    if (Array.isArray(skills) && skills.every((s) => typeof s === "string")) {
      return (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-100 border rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      );
    }

    // 2) array of objects like [{ category, items: [...] }, ...]
    if (
      Array.isArray(skills) &&
      skills.every((s) => s && typeof s === "object" && "category" in s)
    ) {
      return (
        <div className="space-y-3">
          {skills.map((s, idx) => {
            const items = Array.isArray(s.items)
              ? s.items
              : typeof s.items === "string"
              ? s.items.split(",").map((x) => x.trim())
              : Object.values(s.items || {});
            return (
              <div key={idx}>
                <h3 className="font-semibold text-lg mb-2">{s.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 bg-gray-100 border rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // 3) object of categories: { Languages: [...], Frameworks: [...] }
    if (typeof skills === "object" && !Array.isArray(skills)) {
      return (
        <>
          {Object.entries(skills).map(([category, items], idx) => {
            const normalizedItems = Array.isArray(items)
              ? items
              : typeof items === "string"
              ? items.split(",").map((x) => x.trim())
              : Object.values(items || {});
            return (
              <div key={idx}>
                <h3 className="font-semibold text-lg mb-2">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {normalizedItems.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 bg-gray-100 border rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      );
    }

    // fallback: show whatever as strings
    return (
      <div className="flex flex-wrap gap-2">
        {Array.isArray(skills) ? (
          skills.map((s, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-100 border rounded-full text-sm"
            >
              {typeof s === "string" ? s : JSON.stringify(s)}
            </span>
          ))
        ) : (
          <span className="px-3 py-1 bg-gray-100 border rounded-full text-sm">
            {JSON.stringify(skills)}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar />

      {/* Chat container */}
      <div className="flex flex-col flex-1 w-full max-w-2xl mx-auto border rounded">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 mt-16">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-lg max-w-lg w-full break-words ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.sender === "bot" ? (
                  <div className="space-y-3">
                    {/* Experience Block */}
                    {msg.text?.data?.experience &&
                      Array.isArray(msg.text.data.experience) &&
                      msg.text.data.experience.length > 0 && (
                        <div>
                          <h2 className="font-bold text-xl mb-3">Experience</h2>
                          <div className="space-y-3">
                            {msg.text.data.experience.map((exp, idx) => (
                              <div
                                key={idx}
                                className="border rounded-lg p-3 bg-white shadow-sm"
                              >
                                <div className="flex justify-between items-center">
                                  <h3 className="font-semibold text-lg">
                                    {exp.company ||
                                      exp.employer ||
                                      exp.organization}
                                  </h3>
                                  <span className="text-sm text-gray-500">
                                    {exp.period || exp.duration}
                                  </span>
                                </div>
                                <p className="mt-1 font-medium">
                                  {exp.role || exp.title}
                                </p>
                                {Array.isArray(exp.highlights) &&
                                  exp.highlights.length > 0 && (
                                    <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                                      {exp.highlights.map((highlight, hIdx) => (
                                        <li key={hIdx}>{highlight}</li>
                                      ))}
                                    </ul>
                                  )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Education Block */}
                    {msg.text?.data?.education &&
                      Array.isArray(msg.text.data.education) &&
                      msg.text.data.education.length > 0 && (
                        <div>
                          <h2 className="font-bold text-xl mb-3">Education</h2>
                          <div className="space-y-3">
                            {msg.text.data.education.map((edu, idx) => (
                              <div
                                key={idx}
                                className="border rounded-lg p-3 bg-white shadow-sm"
                              >
                                <div className="flex justify-between items-center">
                                  <h3 className="font-semibold text-lg">
                                    {edu.degree}
                                  </h3>
                                  <span className="text-sm text-gray-500">
                                    {edu.period}
                                  </span>
                                </div>
                                <p className="mt-1 font-medium">
                                  {edu.institution}
                                </p>
                                {edu.cgpa && (
                                  <p className="text-gray-700">
                                    CGPA: {edu.cgpa}
                                  </p>
                                )}
                                {edu.percentage && (
                                  <p className="text-gray-700">
                                    Percentage: {edu.percentage}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Profile Block */}
                    {msg.text?.data?.profile &&
                      Object.keys(msg.text.data.profile).length > 0 && (
                        <div>
                          <h2 className="font-bold text-lg mb-2">
                            {msg.text.data.profile?.name}
                          </h2>
                          <ul className="space-y-1">
                            {msg.text.data.profile?.email && (
                              <li>
                                <b>Email:</b>{" "}
                                <a
                                  href={`mailto:${msg.text.data.profile.email}`}
                                  className="text-blue-600 underline"
                                >
                                  {msg.text.data.profile.email}
                                </a>
                              </li>
                            )}
                            {msg.text.data.profile?.location && (
                              <li>
                                <b>Location:</b>{" "}
                                {msg.text.data.profile.location}
                              </li>
                            )}
                            {msg.text.data.profile?.github && (
                              <li>
                                <b>GitHub:</b>{" "}
                                <a
                                  href={msg.text.data.profile.github}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-blue-600 underline"
                                >
                                  {msg.text.data.profile.github}
                                </a>
                              </li>
                            )}
                            {msg.text.data.profile?.linkedin && (
                              <li>
                                <b>LinkedIn:</b>{" "}
                                <a
                                  href={msg.text.data.profile.linkedin}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-blue-600 underline"
                                >
                                  {msg.text.data.profile.linkedin}
                                </a>
                              </li>
                            )}
                            {msg.text.data.profile?.website && (
                              <li>
                                <b>Website:</b>{" "}
                                <a
                                  href={msg.text.data.profile.website}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-blue-600 underline"
                                >
                                  {msg.text.data.profile.website}
                                </a>
                              </li>
                            )}
                          </ul>
                          {msg.text.data.profile?.summary && (
                            <p className="mt-2">
                              {msg.text.data.profile.summary}
                            </p>
                          )}
                        </div>
                      )}

                    {/* Projects Block */}
                    {msg.text?.data?.projects &&
                      Array.isArray(msg.text.data.projects) &&
                      msg.text.data.projects.length > 0 && (
                        <div>
                          <h2 className="font-bold text-xl mb-3">Projects</h2>
                          <div className="space-y-3">
                            {msg.text.data.projects.map((proj, idx) => {
                              const title =
                                proj.title || proj.name || "Untitled Project";
                              const link =
                                proj.link || proj.url || proj.website;
                              const description =
                                proj.description ||
                                proj.desc ||
                                proj.summary ||
                                "";
                              const techStack =
                                proj.techStack || proj.type || [];
                              const techs = Array.isArray(techStack)
                                ? techStack
                                : typeof techStack === "string"
                                ? techStack.split(",").map((t) => t.trim())
                                : Object.values(techStack || {});

                              return (
                                <div
                                  key={idx}
                                  className="border rounded-lg p-3 bg-white shadow-sm"
                                >
                                  <div className="flex justify-between items-center">
                                    <h3 className="font-semibold text-lg">
                                      {title}
                                    </h3>
                                    {link && (
                                      <a
                                        href={link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-2 py-1 text-sm bg-black text-white rounded hover:bg-gray-800"
                                      >
                                        View Project
                                      </a>
                                    )}
                                  </div>
                                  {description && (
                                    <p className="text-gray-700 mt-1">
                                      {description}
                                    </p>
                                  )}
                                  {techs.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {techs.map((tech, tIdx) => (
                                        <span
                                          key={tIdx}
                                          className="px-2 py-1 bg-gray-100 border rounded text-xs"
                                        >
                                          {tech}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                    {/* Skills Block (robust handling) */}
                    {msg.text?.data?.skills &&
                      ((Array.isArray(msg.text.data.skills) &&
                        msg.text.data.skills.length > 0) ||
                        (typeof msg.text.data.skills === "object" &&
                          Object.keys(msg.text.data.skills).length > 0)) && (
                        <div>
                          <h2 className="font-bold text-xl mb-3">Skills</h2>
                          <div className="space-y-4">
                            {renderSkills(msg.text.data.skills)}
                          </div>
                        </div>
                      )}

                    {/* Always render message last */}
                    {msg.text?.message && (
                      <p className="mt-3">{msg.text.message}</p>
                    )}
                  </div>
                ) : (
                  <p>{msg.text}</p>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg max-w-md">
                <span className="dot-animate"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input box */}
        <div className="p-3 border-t flex">
          <input
            type="text"
            className="flex-1 border rounded px-3 py-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Send
          </button>
        </div>
      </div>

      {/* Typing animation */}
      <style jsx>{`
        .dot-animate::after {
          content: "...";
          animation: dots 1.2s steps(4, end) infinite;
        }
        @keyframes dots {
          0%,
          20% {
            content: ".";
          }
          40% {
            content: "..";
          }
          60% {
            content: "...";
          }
          80%,
          100% {
            content: "";
          }
        }
      `}</style>
    </div>
  );
}
