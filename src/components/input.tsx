const InlineInput = () => {
    return (
        <div>
            <label htmlFor="firstName">نام</label>
            <input className="mx-3 p-2 rounded-md border border-solid border-slate-300 hover:border-sky-300" type="text" placeholder="برای مثال: علی" />
        </div>
    )
}

export default InlineInput