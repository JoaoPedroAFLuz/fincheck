export function currencyStringToNumber(value: string) {
  return Number(value.replace(/[^0-9.-]+/g, ''));
}

