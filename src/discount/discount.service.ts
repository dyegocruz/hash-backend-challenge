import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const grpc = require('@grpc/grpc-js');
import { loadSync } from '@grpc/proto-loader';
const PROTO_PATH = 'discount.proto';

const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const discountProto = grpc.loadPackageDefinition(packageDefinition).discount;

@Injectable()
export class DiscountService {
  logger = new Logger(DiscountService.name);

  constructor(private readonly configService: ConfigService) {}

  async getProductDiscount(productID: number): Promise<number> {
    return new Promise((resolve) => {
      const client = new discountProto.Discount(
        this.configService.get('GRPC_DISCOUNT_CONNECTION_URL'),
        grpc.credentials.createInsecure(),
      );

      let discount = 0.0;
      client.GetDiscount({ productID }, async function (err, response) {
        if (!err) {
          discount = +response.percentage.toFixed(2);
        }
        resolve(discount);
      });
    });
  }
}
