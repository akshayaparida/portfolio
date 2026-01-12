interface ConnectCardProps {
  email?: string;
}

export default function ConnectCard({
  email = "akshayaparida2811@gmail.com",
}: ConnectCardProps) {
  return (
    <aside className="hidden lg:block fixed right-6 top-[45%] w-64 p-4 bg-white border border-gray-200 rounded-xl shadow-sm z-40">
      <h4 className="font-semibold text-black mb-2">Let&apos;s connect!</h4>
      <p className="text-sm text-gray-600 mb-3">
        I&apos;m always open to discussing new projects, creative ideas or
        opportunities to be part of your vision.
      </p>
      <a
        href={`mailto:${email}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
      >
        Get in touch
        <i className="fa-solid fa-arrow-right text-xs"></i>
      </a>
    </aside>
  );
}
