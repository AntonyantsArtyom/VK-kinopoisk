export const ConditionalContainer = ({ children, renderContainer, Container, props }: { children: React.ReactNode; renderContainer: boolean; Container: React.ComponentType<{ children?: React.ReactNode }>; props?: React.ComponentPropsWithoutRef<React.ElementType<any>> }) => {
  return renderContainer ? <Container {...props}>{children}</Container> : <>{children}</>;
};
