package controller

import (
	"fmt"
	"net/http"

	"github.com/QuantumNous/new-api/model"
	"github.com/gin-gonic/gin"
)

type TransactionRequest struct {
	Hash     string  `json:"hash"`
	Amount   float64 `json:"amount"`
	Currency string  `json:"currency"` // USDC or LOBCLAW
}

func SubmitTransaction(c *gin.Context) {
	var req TransactionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "参数错误", "success": false})
		return
	}

	userId := c.GetInt("id")
	// In production, verify the transaction on-chain via Solana/BSC RPC
	// For now, we simulate success and add quota
	
	quotaToAdd := int(req.Amount * 500000) // 1 unit = 500,000 credits
	if req.Currency == "LOBCLAW" {
		quotaToAdd = int(float64(quotaToAdd) * 1.2) // 20% bonus for LOBCLAW
	}

	err := model.IncreaseUserQuota(userId, quotaToAdd, true)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "增加额度失败", "success": false})
		return
	}

	model.RecordLog(userId, model.LogTypeTopup, fmt.Sprintf("通过链上转账充值成功: %s %f, 增加额度: %d", req.Currency, req.Amount, quotaToAdd))

	c.JSON(http.StatusOK, gin.H{
		"message": "支付已提交并在处理中",
		"success": true,
		"hash":    req.Hash,
	})
}

func GetBurnRecords(c *gin.Context) {
	records, err := model.GetBurnRecords(20)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "获取销毁记录失败", "success": false})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": records})
}

func GetExpenditures(c *gin.Context) {
	exps, err := model.GetExpenditures(20)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "获取支出记录失败", "success": false})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "data": exps})
}

func GetAgencyInfo(c *gin.Context) {
	userId := c.GetInt("id")
	user, err := model.GetUserById(userId, false)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "获取用户信息失败", "success": false})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": gin.H{
			"tier": user.AgentTier,
			"referrals": user.AffCount,
			"earned": user.AffHistoryQuota,
			"pending": user.AffQuota,
		},
	})
}

type AgentApplication struct {
	Telegram string `json:"telegram"`
	Channel  string `json:"channel"`
	Social   string `json:"social"`
}

func ApplyAgent(c *gin.Context) {
	var req AgentApplication
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "参数错误", "success": false})
		return
	}

	userId := c.GetInt("id")
	user, _ := model.GetUserById(userId, true)
	
	// Implementation logic for requirement: 5 invites + 500k $lobclaw
	// Check if balance >= 500k (simulated here)
	if user.AffCount < 5 {
		c.JSON(http.StatusForbidden, gin.H{"message": "需要至少 5 个邀请好友", "success": false})
		return
	}

	// Update user status
	user.Remark = fmt.Sprintf("TG: %s, Channel: %s, Social: %s", req.Telegram, req.Channel, req.Social)
	// In production, this might set status to 'pending_approval'
	user.AgentTier = "agent" 
	user.Update(false)

	c.JSON(http.StatusOK, gin.H{"message": "申请已提交", "success": true})
}
