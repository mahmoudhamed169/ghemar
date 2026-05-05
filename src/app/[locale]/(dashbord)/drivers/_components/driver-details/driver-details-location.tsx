export default function DriverDetailsLocation() {
  return (
    <div className="border  border-[#00000014] rounded-xl p-4 flex flex-col gap-3">
      <h3 className="font-semibold text-[#000709] text-right">الموقع</h3>
      <p className="text-sm text-gray-500 text-right">
        حي النقا، طريق أنس بن مالك، مبنى رقم 74، الرياض
      </p>
      <div className="w-full h-40 rounded-xl overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.0!2d46.6!3d24.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzAwLjAiTiA0NsKwMzYnMDAuMCJF!5e0!3m2!1sen!2ssa!4v1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}
