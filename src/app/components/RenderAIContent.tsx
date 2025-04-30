export const RenderAIContent = ({ content }: { content: string }) => {
  // Render <think> as italic/thinking animation
  const withEffects = content
    .replace(/<think>/g, '<span class="italic text-gray-500 animate-pulse">')
    .replace(/<\/think>/g, "</span>");

  return <div dangerouslySetInnerHTML={{ __html: withEffects }} />;
};
