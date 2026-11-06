import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ResearchPage from "../page";

// Mock the components used in the page
jest.mock("@/components/BlogPageHeader", () => {
  return function MockBlogPageHeader(props: {
    title: string;
    backLink: string;
  }) {
    return (
      <div data-testid="blog-page-header">
        <a href={props.backLink}>Back</a>
        <span>{props.title}</span>
      </div>
    );
  };
});

jest.mock("@/components/PageFooter", () => {
  return function MockPageFooter(props: { moduleName: string }) {
    return <footer data-testid="page-footer">{props.moduleName}</footer>;
  };
});

describe("ResearchPage", () => {
  it("renders the hero banner and the 4-stage scientific methodology by default", () => {
    render(<ResearchPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Learn AI & ML Research from Scratch/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/How to Read & Deconstruct Research Papers/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Formulating Novel Research Questions/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Rigorous Experimentation & Ablation Studies/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Writing in LaTeX & The Peer-Review Battle/i),
    ).toBeInTheDocument();
  });

  it("switches to Topic Research Starters tab", () => {
    render(<ResearchPage />);

    const topicsTab = screen.getByRole("button", {
      name: /Topic Research Starters/i,
    });
    fireEvent.click(topicsTab);

    expect(
      screen.getByText(/Large Language Models, Transformers & Reasoning/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Computer Vision, Diffusion & Multimodal Learning/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Attention Is All You Need/i)).toBeInTheDocument();
  });

  it("switches to Elsevier Academy & NPTEL Courses tab and filters sub-sections", () => {
    render(<ResearchPage />);

    const coursesTab = screen.getByRole("button", {
      name: /Elsevier Academy & NPTEL Courses/i,
    });
    fireEvent.click(coursesTab);

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Elsevier Researcher Academy",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Introduction to Research",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/Prof. Prathap Haridoss/i)[0],
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /How to Start Research from Scratch \(12-Week Blueprint\)/i,
      ),
    ).toBeInTheDocument();

    // Filter to NPTEL only
    const nptelSubFilter = screen.getByRole("button", {
      name: /Official NPTEL IIT Courses/i,
    });
    fireEvent.click(nptelSubFilter);

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Introduction to Research",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        level: 3,
        name: "Elsevier Researcher Academy",
      }),
    ).not.toBeInTheDocument();

    // Filter to Elsevier only
    const elsevierSubFilter = screen.getByRole("button", {
      name: /Elsevier & Global Academies/i,
    });
    fireEvent.click(elsevierSubFilter);

    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Elsevier Researcher Academy",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        level: 3,
        name: "Introduction to Research",
      }),
    ).not.toBeInTheDocument();
  });

  it("switches to Free Research Tools & GPUs tab and filters categories", () => {
    render(<ResearchPage />);

    const toolsTab = screen.getByRole("button", {
      name: /Free Research Tools & GPUs/i,
    });
    fireEvent.click(toolsTab);

    expect(screen.getByText(/arXiv\.org/i)).toBeInTheDocument();
    expect(screen.getByText(/Google Colab/i)).toBeInTheDocument();

    // Filter to only compute tools
    const computeFilter = screen.getByRole("button", {
      name: /Free Cloud GPUs & Compute/i,
    });
    fireEvent.click(computeFilter);

    expect(screen.getByText(/Google Colab/i)).toBeInTheDocument();
    expect(screen.getByText(/Kaggle GPU Notebooks/i)).toBeInTheDocument();
    expect(screen.queryByText(/arXiv\.org/i)).not.toBeInTheDocument();
  });

  it("switches to Top Conferences & Journals tab", () => {
    render(<ResearchPage />);

    const confTab = screen.getByRole("button", {
      name: /Top Conferences & Journals/i,
    });
    fireEvent.click(confTab);

    expect(screen.getByText("NeurIPS")).toBeInTheDocument();
    expect(screen.getByText("ICML")).toBeInTheDocument();
    expect(screen.getByText("ICLR")).toBeInTheDocument();
    expect(screen.getByText("CVPR")).toBeInTheDocument();
    expect(screen.getByText("ACL")).toBeInTheDocument();
    expect(screen.getByText("TMLR")).toBeInTheDocument();
  });
});
