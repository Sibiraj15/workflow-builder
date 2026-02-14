import WorkflowBuilder from "../components/WorkflowBuilder";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8 ">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Workflow Builder
          </h1>
          <p className="text-slate-600">
            Create and manage your automated workflows
          </p>
        </div>
        <WorkflowBuilder />
      </div>
    </div>
  );
};

export default Home;