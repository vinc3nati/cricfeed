import cricIcon from "../../assets/keyInfo_2.png";

export const KeyInfo = ({ title, data }) => {
  return (
    <div className="key-info">
      <img className="key-info-img" src={cricIcon} alt="cricket icon" />
      <p className="key-info-data">{data}</p>
      <p className="key-info-title">{title}</p>
    </div>
  );
};
