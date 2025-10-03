import { useState } from "react";
import {
  FaBriefcase,
  FaCode,
  FaEnvelope,
  FaFileAlt,
  FaLayerGroup,
  FaUser,
} from "react-icons/fa";
import "../App.css";
import FluidBackground from "../components/CursorBackground";
import ExperienceCard from "../components/ExperienceCard";
import FaceFollow from "../components/FaceFollow";
import InputField from "../components/InputField";

function LandingPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white flex flex-col">
      {/* Fluid animated background */}
      <FluidBackground className="fixed inset-0 z-10 bg-white" />

      {/* Header with CV */}
      <header className="fixed top-6 right-6 z-30 ">
        <ExperienceCard
          icon={<FaFileAlt className="text-outline-grey text-2xl" />}
          title="CV"
          className="bg-white/30 backdrop-blur-md"
        />
      </header>

      {/* Main content */}
      <main className="relative z-20 flex flex-col items-center text-center mt-20 px-4 pointer-events-none">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-5xl font-bold text-black">I'm Abdullah</h1>
          <h3 className="text-2xl md:text-3xl text-black mt-4 max-w-xl">
            A Full Stack Developer <br />
            Who Delivers Modern & Scalable Web Solutions
          </h3>
          <div className="mt-8">
            <FaceFollow />
          </div>
        </section>

        {/* CTA Input */}
        <section className="w-full flex justify-center mt-6 mb-10">
          <InputField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onSubmit={() => console.log("Submitted:", message)}
          />
        </section>

        {/* Quick Navigation (Cards) */}
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-4">
          <ExperienceCard
            icon={<FaUser className="text-blue-500 stroke-2" />}
            title="About Me"
            message={"Tell me about yourself"}
          />
          <ExperienceCard
            icon={<FaCode className="text-pink-500 stroke-2" />}
            title="Projects"
            message={"projects"}
          />
          <ExperienceCard
            icon={<FaLayerGroup className="text-teal-500 stroke-2" />}
            title="Skills"
            message={"skills"}
          />
          <ExperienceCard
            icon={<FaBriefcase className="text-purple-500 stroke-2" />}
            title="Experience"
            message={"Experience"}
          />
          <ExperienceCard
            icon={<FaEnvelope className="text-indigo-500 stroke-2" />}
            title="Contact"
            message={"Contact"}
          />
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
