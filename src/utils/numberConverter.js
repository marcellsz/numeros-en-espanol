// src/utils/numberConverter.js

const units = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
const teens = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
const twenties = ['', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
const tens = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
const hundreds = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

export const numberToSpanish = (num) => {
    if (num === 0) return 'cero';
    if (num === 100) return 'cien';
    if (num === 1000) return 'mil';

    let text = '';

    // Százasok
    if (num >= 100) {
        text += hundreds[Math.floor(num / 100)];
        if (num % 100 !== 0) {
            text += ' ';
        }
        num %= 100;
    }

    // Tízesek és egyesek
    if (num >= 30) {
        text += tens[Math.floor(num / 10)];
        if (num % 10 !== 0) {
            text += ' y ' + units[num % 10];
        }
    } else if (num >= 20) {
        if (num === 20) {
            text += 'veinte';
        } else {
            // A 21-29 egybeíródik (pl. veintiuno)
            text += twenties[num % 10];
        }
    } else if (num >= 10) {
        text += teens[num - 10];
    } else if (num > 0) {
        text += units[num];
    }

    return text.trim();
};