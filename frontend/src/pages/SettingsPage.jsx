import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
    { id: 1, content: "Hey! How's it going?", isSent: false },
    { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
  ];

const SettingsPage = () => {

    const {theme, setTheme} = useThemeStore();

    return (
        <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
            <div className="space-y-6">
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold"> <span className="text-gradient">Theme</span></h2>
                    <p className="text-sm text-base-content/70"> <span className="text-right-gradient">Choose a theme for your chat interface</span></p>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    {THEMES.map((t) => (
                    <button
                        key={t}
                        className={
                            `group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                            ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}`
                        }
                        onClick={() => setTheme(t)}
                    >
                        <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                            <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                                <div className="rounded bg-primary"></div>
                                <div className="rounded bg-secondary"></div>
                                <div className="rounded bg-accent"></div>
                                <div className="rounded bg-neutral"></div>
                            </div>
                        </div>
                        <span className="text-[11px] font-medium truncate w-full text-center">
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </span>
                    </button>
                    ))}
                </div>

                {/* Preview Section */}
                <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
                    <div className="p-4 bg-base-200">
                        <h3 className="text-lg font-semibold mb-4"> <span className="text-gradient">Preview</span></h3>
                        <div className="max-w-lg mx-auto">
                            {/* Mock Chat UI */}
                            <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                                {/* Chat Header */}
                                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#EA8D8D] to-[#A890FE] flex items-center justify-center text-primary-content font-medium">
                                            {/* <img src="/avatar.png" alt="avatar" /> */}
                                            U
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-sm">Unknown</h3>
                                            <p className="text-xs text-base-content/70 text-green-600">Online</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Chat Messages */}
                                <div className="p-4 space-y-4 min-h-[300px] max-h-[300px] overflow-y-auto bg-base-100">
                                    {PREVIEW_MESSAGES.map((message) => (
                                        <div
                                        key={message.id}
                                        className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                                        >
                                            <div
                                                className={`
                                                max-w-[80%] rounded-xl p-3 shadow-sm
                                                ${message.isSent 
                                                    ? theme === 'light'
                                                        ? "bg-[#F0F0F0] text-black" 
                                                        : "bg-[#2A2F3D] text-white"
                                                    : "bg-gradient-to-r from-[rgba(24,138,141,1)] to-[rgba(96,221,142,1)] text-white"}
                                                `}
                                            >
                                                <p className="text-sm">{message.content}</p>
                                                <p
                                                className={`
                                                    text-[10px] mt-1.5
                                                    ${message.isSent 
                                                        ? theme === 'light'
                                                            ? "text-black/70"
                                                            : "text-white/70" 
                                                        : "text-white/70"}
                                                `}
                                                >
                                                    12:00 PM
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Chat Input */}
                                <div className="p-4 border-t border-base-300 bg-base-100">
                                    <div className="flex gap-2">
                                        <input
                                        type="text"
                                        className="input input-bordered flex-1 text-sm h-10"
                                        placeholder="Type a message..."
                                        value="This is a preview"
                                        readOnly
                                        />
                                        <button className="btn btn-gradient h-10 min-h-0">
                                            <Send size={18} />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>            
        </div>
    )
}

export default SettingsPage