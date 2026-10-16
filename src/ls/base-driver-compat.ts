type DriverMessage = {
  message: string;
  date: Date;
};

export default class BaseDriverCompat<DriverLib, DriverOptions = any> {
  public credentials: any;
  protected getWorkspaceFolders: any;
  public connection: Promise<DriverLib> | null = null;
  protected deps: DriverOptions[] = [];
  protected queries: any;

  constructor(credentials: any, getWorkspaceFolders?: any) {
    this.credentials = credentials;
    this.getWorkspaceFolders = getWorkspaceFolders;
  }

  public getId() {
    return this.credentials.id;
  }

  protected prepareMessage(message: unknown): DriverMessage {
    return {
      message: String(message),
      date: new Date(),
    };
  }

  protected queryResults = async (query: any, opt?: any) => {
    const [result] = await this.query(query, opt);
    if (result.error) {
      throw result.rawError;
    }
    return result.results;
  };

  protected singleQuery(query: any, opt?: any) {
    return this.query(query, opt).then(([result]) => result);
  }

  public async describeTable(metadata: any, opt?: any) {
    const result = await this.singleQuery(this.queries.describeTable(metadata), opt);
    result.baseQuery = this.queries.describeTable.raw;
    return [result];
  }

  public async showRecords(table: any, opt: any) {
    const { limit, page = 0 } = opt;
    const params = {
      ...opt,
      limit,
      table,
      offset: page * limit,
    };

    if (
      typeof this.queries.fetchRecords === "function" &&
      typeof this.queries.countRecords === "function"
    ) {
      const [records, totalResult] = await Promise.all([
        this.singleQuery(this.queries.fetchRecords(params), opt),
        this.singleQuery(this.queries.countRecords(params), opt),
      ]);

      records.baseQuery = this.queries.fetchRecords.raw;
      records.pageSize = limit;
      records.page = page;
      records.total = Number(totalResult.results[0].total);
      records.queryType = "showRecords";
      records.queryParams = table;
      return [records];
    }

    return this.query(this.queries.fetchRecords(params), opt);
  }

  public query(_query: string, _opt?: any): Promise<any[]> {
    throw new Error("query not implemented");
  }
}