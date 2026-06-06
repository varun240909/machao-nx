import CallModal from "@/components/CallModal"

export default function OrderNowButton() {
  return (
    <CallModal
      label="Order Now"
      className="btn-cta"
      style={{ background: "var(--primary)", color: "white" }}
    />
  )
}
