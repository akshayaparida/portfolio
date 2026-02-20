"use client";

import BlogPageHeader from "@/components/BlogPageHeader";
import ModuleSidebar from "@/components/ModuleSidebar";
import AWSModuleIcon from "@/components/AWSModuleIcon";
import { awsModules } from "@/data/aws";
import gitMetadata from "@/data/git-metadata.json";

export default function AWSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="aws-container">
      <BlogPageHeader
        title="AWS Cloud"
        backLink="/learning-journey"
        backTitle="My Journey"
      />

      <div
        className="main-layout"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="module-page-layout">
          <ModuleSidebar
            modules={awsModules}
            basePath="/aws"
            renderIcon={(moduleId: string) => (
              <AWSModuleIcon moduleId={moduleId} />
            )}
          />
          <main className="module-content-area">{children}</main>
        </div>
      </div>

      <footer className="aws-footer">
        <p>
          Last updated:{" "}
          <a
            href={gitMetadata.commitUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {gitMetadata.commitDate}
          </a>
          {" · "}
          <a
            href="https://github.com/akshayaparida/portfolio/issues/new?title=AWS%20Module%20Error&labels=bug,aws&body=%23%23%20Error%20Description%0A%0A%3C!--%20Describe%20the%20error%20you%20found%20--%3E%0A%0A%23%23%20Location%0A%0A-%20**Module%3A**%20AWS%0A-%20**Section%3A**%20%0A%0A%23%23%20Expected%20Behavior%0A%0A%3C!--%20What%20should%20happen%3F%20--%3E%0A%0A%23%23%20Actual%20Behavior%0A%0A%3C!--%20What%20actually%20happens%3F%20--%3E%0A%0A%23%23%20Steps%20to%20Reproduce%0A%0A1.%20%0A2.%20%0A3.%20%0A%0A%23%23%20Screenshot%20%28optional%29%0A%0A"
            target="_blank"
            rel="noopener noreferrer"
          >
            Report an error
          </a>
        </p>
      </footer>

      <style jsx>{`
        .aws-container {
          min-height: 100vh;
          background: #fafafa;
          display: flex;
          flex-direction: column;
        }
        .main-layout {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          flex: 1;
          width: 100%;
          box-sizing: border-box;
        }
        .aws-footer {
          text-align: center;
          padding: 1.5rem 2rem;
          border-top: 1px solid #e5e7eb;
          margin-top: auto;
        }
        .aws-footer p {
          color: #9ca3af;
          font-size: 0.85rem;
          margin: 0;
        }
        .aws-footer a {
          color: #ff9900;
          text-decoration: underline;
        }
        @media (max-width: 900px) {
          .main-layout {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
