"use client";

import { SearchIcon } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Highlighter from "react-highlight-words";

type Props = {
  transcript: string[];
};

const Transcript = ({ transcript }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedResults, setHighlightedResults] = useState<string[]>([]);

  // ✅ useCallback fixes the missing dependency warning
  const processCombinedResults = useCallback(() => {
    if (!searchTerm) {
      setHighlightedResults(transcript);
      return;
    }

    const filtered = transcript.filter((line) =>
      line.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setHighlightedResults(filtered);
  }, [searchTerm, transcript]);

  useEffect(() => {
    processCombinedResults();
  }, [processCombinedResults]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <SearchIcon className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search transcript..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {highlightedResults.length === 0 ? (
          <p className="text-gray-500">No matches found.</p>
        ) : (
          highlightedResults.map((line, idx) => (
            <p key={idx} className="text-gray-800">
              <Highlighter
                highlightClassName="bg-yellow-200"
                searchWords={[searchTerm]}
                autoEscape={true}
                textToHighlight={line}
              />
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default Transcript;
