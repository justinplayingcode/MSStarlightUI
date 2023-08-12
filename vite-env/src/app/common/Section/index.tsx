import "./index.scss"

interface IUniformSectionProps {
  headerTitle: string;
  elementInner: JSX.Element;
  className?: string;
}

function UniformSection({...props}: IUniformSectionProps) {
  return (  
    <div className={`uniform-section ${props.className}`}>
      <div className="uniform-section-header">{props.headerTitle}</div>
      <div className="uniform-section-content">{props.elementInner}</div>
    </div>
  );
}

export default UniformSection;