import "./StatCard.css";

export default function StatCard({
  text,
  data,
  color,
  icon,
  extra,
  secondaryColor,
}) {
  return (
    <>
      <div class={`info-box-2 ft-white mdl-shadow--2dp ${color}`}>
        <div class="info-box-icon">
          <i class="x-icon material-icons">{icon}</i>
        </div>
        <div class="info-box-body">
          <div class="info-box-title pb-2">{text}</div>
          <div class="info-box-subtitle ft-bold pb-2">{data}</div>
          <div
            style={{ color: secondaryColor, fontSize: 16, fontWeight: "bold" }}
          >
            {extra}
          </div>
        </div>
      </div>
    </>
  );
}
