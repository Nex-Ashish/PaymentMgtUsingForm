export default function FilterSubmission({ value, onChange }) {
    return (
        <div className="flex gap-1 items-center ">

            <h2 className="text-center text-xl">Filter</h2>

            <select value={value} onChange={(e) => onChange(e?.target?.value)} name="status" className="p-2 my-3 border rounded-lg cursor-pointer bg-blue-100 w-sm self-center">
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
            </select>
        </div>
    )
}