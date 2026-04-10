export default function FilterTransaction({ value, onChange }) {
    return (
        <div className="flex gap-1 items-center ">

            <h2 className="text-center text-xl">Filter</h2>

            <select value={value} onChange={(e) => onChange(e?.target?.value)} name="status" className="p-2 my-3 border rounded-2xl cursor-pointer bg-blue-100 w-sm self-center">
                <option value="all">All</option>
                <option value="upi">UPI</option>
                <option value="card">Card</option>
                <option value="net_banking">Net Banking</option>
            </select>
        </div>
    )
}