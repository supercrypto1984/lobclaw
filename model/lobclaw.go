package model

type Expenditure struct {
	Id          int    `json:"id"`
	Amount      float64 `json:"amount"`
	Currency    string `json:"currency" gorm:"type:varchar(16)"`
	Category    string `json:"category" gorm:"type:varchar(64);index"`
	Description string `json:"description" gorm:"type:text"`
	TxHash      string `json:"tx_hash" gorm:"type:varchar(128);index"`
	Timestamp   int64  `json:"timestamp" gorm:"index"`
}

type BurnRecord struct {
	Id        int    `json:"id"`
	Amount    float64 `json:"amount"`
	TxHash    string `json:"tx_hash" gorm:"type:varchar(128);index"`
	Source    string `json:"source" gorm:"type:varchar(64)"` // Auto-Burn, Tax Burn, Manual Burn
	Timestamp int64  `json:"timestamp" gorm:"index"`
}

func CreateExpenditure(exp *Expenditure) error {
	return DB.Create(exp).Error
}

func CreateBurnRecord(burn *BurnRecord) error {
	return DB.Create(burn).Error
}

func GetExpenditures(limit int) ([]*Expenditure, error) {
	var expenditures []*Expenditure
	err := DB.Order("timestamp desc").Limit(limit).Find(&expenditures).Error
	return expenditures, err
}

func GetBurnRecords(limit int) ([]*BurnRecord, error) {
	var records []*BurnRecord
	err := DB.Order("timestamp desc").Limit(limit).Find(&records).Error
	return records, err
}

func AutoMigrateLobClaw() error {
	return DB.AutoMigrate(&Expenditure{}, &BurnRecord{})
}
