declare module "react-highlight-words" {
  import * as React from "react";

  export interface HighlighterProps {
    searchWords: string[];
    textToHighlight: string;
    autoEscape?: boolean;
    caseSensitive?: boolean;
    highlightClassName?: string;
  }

  export default class Highlighter extends React.Component<HighlighterProps> {}
}
