// Progress %2 artırır, max 100 sınırı uygular
export function calculateProgress(current: number, increase: number = 2): number {
    return Math.min(current + increase, 100);
  }
  
  // Progress %100 veya üstü mü? (level up olur)
  export function shouldLevelUp(progress: number): boolean {
    return progress >= 100;
  }
  
  // Enerji 1 azaltılır ama 0 altına inemez
  export function calculateEnergyAfterClick(currentEnergy: number): number {
    return Math.max(currentEnergy - 1, 0);
  }
  
  // Genel sayı sınırlandırıcı (optional)
  export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
  