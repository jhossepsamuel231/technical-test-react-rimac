export type SelectedPlanPersisted = {
  insuredFullName: string
  payerDocumentType: 'DNI' | 'RUC'
  payerDocumentNumber: string
  payerMobileNumber: string
  chosenPlanName: string
  chosenPlanMonthlyPrice: number
}

const LOCAL_STORAGE_KEY_SELECTED_PLAN = 'selectedPlan'

export function readSelectedPlanFromLocalStorage(): SelectedPlanPersisted | null {
  const rawValue = localStorage.getItem(LOCAL_STORAGE_KEY_SELECTED_PLAN)
  if (!rawValue) return null

  try {
    const parsed = JSON.parse(rawValue) as Partial<SelectedPlanPersisted>
    const isValid =
      typeof parsed?.insuredFullName === 'string' &&
      (parsed?.payerDocumentType === 'DNI' || parsed?.payerDocumentType === 'RUC') &&
      typeof parsed?.payerDocumentNumber === 'string' &&
      typeof parsed?.payerMobileNumber === 'string' &&
      typeof parsed?.chosenPlanName === 'string' &&
      typeof parsed?.chosenPlanMonthlyPrice === 'number'

    return isValid ? (parsed as SelectedPlanPersisted) : null
  } catch {
    return null
  }
}

export function saveSelectedPlanToLocalStorage(plan: SelectedPlanPersisted): void {
  localStorage.setItem(LOCAL_STORAGE_KEY_SELECTED_PLAN, JSON.stringify(plan))
}
