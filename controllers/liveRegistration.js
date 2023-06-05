const models = require('../models');
const { LiveRegistration, Payment, Event, LiveEvent, User } = models;

module.exports = {
  createLiveRegistration: async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user.id;

    try {
      const event = await Event.findOne({
        where: { id: eventId },
        include: { model: LiveEvent },
      });

      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      const liveEventId = event.LiveEvent ? event.LiveEvent.id : null;

      if (!liveEventId) {
        return res.status(404).json({ message: 'Live event not found' });
      }

      const live = await LiveRegistration.create({
        liveEventId,
        userId,
        purchaseAt: new Date(),
      });

      return res
        .status(200)
        .json({ message: 'Ticket created successfully', data: live });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Failed to create ticket' });
    }
  },
  getAllLiveRegistrationsByUserId: async (req, res) => {
    const userId = req.params.userId;

    try {
      // Menggunakan metode findAll dengan menggunakan userId sebagai kriteria pencarian
      const liveRegistrations = await LiveRegistration.findAll({
        where: { userId },
        include: [{ model: LiveEvent, include: [Event] }, { model: User }],
      });

      return res.status(200).json({ data: liveRegistrations });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: 'Failed to fetch live registrations' });
    }
  },
  createPayment: async (req, res) => {
    const { liveRegistrationId } = req.params;
    const { amount, paymentMethod } = req.body;

    try {
      const liveRegistration = await LiveRegistration.findByPk(
        liveRegistrationId
      );

      if (!liveRegistration) {
        return res.status(404).json({ message: 'Live registration not found' });
      }

      const payment = await Payment.create({
        liveRegistrationId,
        amount,
        paymentMethod,
      });

      return res
        .status(200)
        .json({ message: 'Payment created successfully', data: payment });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Failed to create payment' });
    }
  },
  getLiveRegistrationById: async (ticketId) => {
    try {
      const ticket = await LiveRegistration.findByPk(ticketId);
      return ticket;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to get ticket');
    }
  },
  getAllLiveRegistration: async () => {
    try {
      const tickets = await LiveRegistration.findAll();
      return tickets;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to get tickets');
    }
  },
  updateLiveRegistration: async (id, data) => {
    try {
      const ticket = await LiveRegistration.findByPk(ticketId);
      if (!ticket) {
        throw new Error('Ticket not found');
      }
      await ticket.update(newData);
      return ticket;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to update ticket');
    }
  },
  deleteLiveRegistration: async (id) => {
    try {
      const ticket = await LiveRegistration.findByPk(ticketId);
      if (!ticket) {
        throw new Error('Ticket not found');
      }
      await ticket.destroy();
    } catch (error) {
      console.log(error);
      throw new Error('Failed to delete ticket');
    }
  },
};
