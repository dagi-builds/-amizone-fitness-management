export default function Contact() {
    return (
        <div className="bg-zinc-950 min-h-screen px-4 md:px-10 py-16 md:py-24">
            <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight">
                    Get In <span className="text-emerald-400">Touch</span>
                </h1>
                <p className="text-zinc-400 text-base md:text-lg mt-4">
                    Visit us, call us, or stop by for a tour — we'd love to have you join the Amizone family.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-12">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-500 text-sm mb-1">Location</p>
                        <p className="text-zinc-100 font-medium">Addis Ababa, Ethiopia</p>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-500 text-sm mb-1">Phone</p>
                        <p className="text-zinc-100 font-medium">+251 91 123 4567</p>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                        <p className="text-zinc-500 text-sm mb-1">Hours</p>
                        <p className="text-zinc-100 font-medium">5 AM – 10 PM, Daily</p>
                    </div>
                </div>
            </div>
        </div>
    )
}