const { validationResult } = require("express-validator");
const { createLeadService, getLeadByIdService, getAllLeadsService, exportLeadsCSVService } = require("../services/leadService");
const logger = require("../utils/logger");

const createLead = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "error", message: "Validation failed", errors: errors.array() });
        }
        const leadData = req.body;
        const result = await createLeadService(leadData, req);
        res.status(201).json({
            status: "success",
            message: result.isExisting ? "Information updated successfully" : "Thank you for your interest! Please check your email for further details.",
            data: {
                leadId: result.lead._id,
                name: result.lead.fullName,
                email: result.lead.email,
                program: result.lead.program,
                isExisting: result.isExisting || false
            }
        })
    }
    catch (err) {
        logger.error("Error creating lead", { error: err.message });
        res.status(500).json({ status: "error", message: err.message });
    }
}

const getLeadById = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: "error",
                message: "Validation failed",
                errors: errors.array()
            });
        }

        const lead = await getLeadByIdService(req.params.id);
        if (!lead) {
            return res.status(404).json({ status: "error", message: "Lead not found" });
        }
        const responseData = {
            id: lead._id,
            firstName: lead.firstName,
            lastName: lead.lastName,
            email: lead.email,
            phone: lead.phone,
            program: lead.program,
            state: lead.state,
            tenthPercentage: lead.tenthPercentage,
            twelfthInfo: lead.twelfthInfo,
            status: lead.leadStatus
        }
        res.status(200).json({ status: "success", data: responseData });
    }
    catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
}

const getAllLeads = async (req, res) => {
    try {
        const filters = {
            page: req.query.page,
            limit: req.query.limit,
            program: req.query.program,
            state: req.query.state,
            search: req.query.search,
            startDate: req.query.startDate,
            endDate: req.query.endDate
        };
        
        const result = await getAllLeadsService(filters);
        
        res.status(200).json({
            status: "success",
            data: result
        });
    } catch (err) {
        logger.error("Error fetching leads", { error: err.message });
        res.status(500).json({ status: "error", message: err.message });
    }
}

const exportLeadsCSV = async (req, res) => {
    try {
        const filters = {
            program: req.query.program,
            state: req.query.state,
            search: req.query.search,
            startDate: req.query.startDate,
            endDate: req.query.endDate
        };
        
        const csv = await exportLeadsCSVService(filters);
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=leads_export.csv');
        res.status(200).send(csv);
    } catch (err) {
        logger.error("Error exporting leads CSV", { error: err.message });
        res.status(500).json({ status: "error", message: err.message });
    }
}

module.exports={
    createLead,
    getLeadById,
    getAllLeads,
    exportLeadsCSV
}