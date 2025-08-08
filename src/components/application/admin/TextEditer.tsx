"use client";

import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

export default function TextEditor() {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const handleKeyCommand = (command: string) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return "handled";
        }
        return "not-handled";
    };

    const toggleInlineStyle = (style: string) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    return (
        <div className="p-4 border rounded max-w-2xl mx-auto">
            <div className="mb-2 space-x-2">
                <button onClick={() => toggleInlineStyle("BOLD")} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Bold</button>
                <button onClick={() => toggleInlineStyle("ITALIC")} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Italic</button>
                <button onClick={() => toggleInlineStyle("UNDERLINE")} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Underline</button>
            </div>

            <div className="border p-3 min-h-[150px] cursor-text bg-white rounded">
                <Editor
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    onChange={setEditorState}
                    placeholder="Write something awesome..."
                />
            </div>
        </div>
    );
}
