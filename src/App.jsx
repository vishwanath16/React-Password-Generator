import { useState } from 'react'
import './App.css'
import { FaClipboard } from 'react-icons/fa'

export default function PasswordGenerator() {
    const [passwordOptions, setPasswordOptions] = useState({
        length: 20,
        lowercase: false,
        uppercase: false,
        numbers: false,
        symbols: false,
    })
    const [password, setPassword] = useState('')

    const handleSlider = (e) => {
        setPasswordOptions({ ...passwordOptions, length: e.target.value })
    }

    const handleCheckbox = (e) => {
        const { name, checked } = e.target
        setPasswordOptions({ ...passwordOptions, [name]: checked })
    }

    const generatePassword = (e) => {
        e.preventDefault()
        const { length, lowercase, uppercase, numbers, symbols } =
            passwordOptions
        const Lowercase = 'abcdefghijklmnopqrstuvwxyz'
        const Uppercase = Lowercase.toUpperCase()
        const Nums = '0123456789'
        const Symbols = '!@#$%^&*()_+-={}[]|\\:;"\'<>,.?/~`'
        let chars = ''
        if (lowercase) chars += Lowercase
        if (uppercase) chars += Uppercase
        if (numbers) chars += Nums
        if (symbols) chars += Symbols
        let password = ''

        if (!chars) {
            setPassword('')
            return
        }

        for (let i = 0; i < length; i++) {
            password += chars[Math.floor(Math.random() * chars.length)]
        }
        setPassword(password)
    }

    const copyPassword = (e) => {
        e.preventDefault()
        navigator.clipboard.writeText(password)
    }

    return (
        <div className="container">
            <h1>Password Generator:</h1>
            <form onSubmit={generatePassword}>
                <label htmlFor="length">
                    Password Length: {passwordOptions.length}
                </label>
                <input
                    id="length"
                    type="range"
                    min={1}
                    max={40}
                    value={passwordOptions.length}
                    onChange={handleSlider}
                />

                <div className="checkbox-group">
                    <input
                        name="lowercase"
                        type="checkbox"
                        id="lowercase-checkbox"
                        checked={passwordOptions.lowercase}
                        onChange={handleCheckbox}
                    />
                    <label htmlFor="lowercase-checkbox">Lowercase</label>

                    <input
                        name="uppercase"
                        type="checkbox"
                        id="uppercase"
                        checked={passwordOptions.uppercase}
                        onChange={handleCheckbox}
                    />
                    <label htmlFor="uppercase">Uppercase</label>

                    <input
                        name="numbers"
                        type="checkbox"
                        id="numbers"
                        checked={passwordOptions.numbers}
                        onChange={handleCheckbox}
                    />
                    <label htmlFor="numbers">Numbers</label>

                    <input
                        name="symbols"
                        type="checkbox"
                        id="symbols"
                        checked={passwordOptions.symbols}
                        onChange={handleCheckbox}
                    />
                    <label htmlFor="symbols">Symbols</label>
                </div>

                <button type="submit">Generate Password</button>

                <div>
                    {password ? (
                        <div className="password">
                            <p className="your-p">
                                <span className="your-password">
                                    Your password:
                                </span>
                                {password}
                            </p>
                            <button title="Copy Password" className="your-p2"
                                onClick={copyPassword}
                            >
                                <FaClipboard />
                            </button>
                        </div>
                    ) : (
                        <p className="your-password">
                            Please select at least one option
                        </p>
                    )}
                </div>
            </form>
        </div>
    )
}
